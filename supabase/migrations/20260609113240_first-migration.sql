CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'user');

CREATE TYPE question_type AS ENUM (
  'text',
  'single_choice',
  'multiple_choice',
  'attachments'
);

CREATE TYPE price_increase_type AS ENUM ('flat', 'percentage');

CREATE TYPE order_status AS ENUM (
  'pending',
  'negotiating',
  'accepted',
  'declined',
  'paid',
  'in_progress',
  'paused',
  'delivered',
  'completed',
  'refunded',
  'cancelled'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'completed',
  'refunded',
  'failed'
);

-- ##### PROFILES #####

-- extends auth.users with app-specific fields
-- created automatically when a user signs up handle_new_user trigger
CREATE TABLE public.profiles (
  id         UUID        PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  username   VARCHAR(64) NOT NULL UNIQUE,
  role       user_role   NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_profiles_username ON public.profiles (username);

-- create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    -- default to the part before @ in the email
    SPLIT_PART(NEW.email, '@', 1)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- keep updated_at current
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ##### Messaging #####

-- one conversation per user (user <=> admin)

CREATE TABLE public.conversations (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL UNIQUE REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_message_at TIMESTAMPTZ
);

CREATE TABLE public.messages (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID        NOT NULL REFERENCES public.conversations (id) ON DELETE CASCADE,
  user_id         UUID        NOT NULL REFERENCES auth.users (id),  -- sender
  content         TEXT        NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_at         TIMESTAMPTZ,
  deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_messages_conversation_id ON public.messages (conversation_id, created_at DESC);
CREATE INDEX idx_messages_user_id         ON public.messages (user_id);

-- cron job deletes all records older than 6 months

CREATE TABLE public.message_attachments (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id  UUID         NOT NULL REFERENCES public.messages (id) ON DELETE CASCADE,
  storage_key VARCHAR(512) NOT NULL,  -- supabase storage object path
  file_name   VARCHAR(255) NOT NULL,
  mime_type   VARCHAR(127) NOT NULL,
  size_bytes  BIGINT       NOT NULL CHECK (size_bytes > 0),
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_message_attachments_message_id ON public.message_attachments (message_id);

-- ##### SERVICES & FORMS #####

CREATE TABLE public.services (
  id                   UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  name                 VARCHAR(255)  NOT NULL,
  short_description    VARCHAR(512)  NOT NULL,
  extended_description TEXT,
  base_price           NUMERIC(10,2) NOT NULL CHECK (base_price >= 0),
  is_active            BOOLEAN       NOT NULL DEFAULT TRUE,
  slot_cap             INT           CHECK (slot_cap IS NULL OR slot_cap > 0),
  slots_used           INT           NOT NULL DEFAULT 0 CHECK (slots_used >= 0),
  created_at           TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  ends_at              TIMESTAMPTZ,

  CONSTRAINT slots_used_lte_cap CHECK (
    slot_cap IS NULL OR slots_used <= slot_cap
  )
);

-- forms are versioned, which updates on edit
-- flip is_current via demote_previous_form_versions trigger

CREATE TABLE public.service_forms (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id  UUID        NOT NULL REFERENCES public.services (id) ON DELETE CASCADE,
  version     INT         NOT NULL DEFAULT 1 CHECK (version > 0),
  is_current  BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (service_id, version)
);

CREATE INDEX idx_service_forms_service_id ON public.service_forms (service_id);

-- ensure only one current form per service
CREATE UNIQUE INDEX idx_service_forms_one_current
  ON public.service_forms (service_id)
  WHERE is_current = TRUE;

-- when a new form version is inserted as current, demote all previous versions
CREATE OR REPLACE FUNCTION public.demote_previous_form_versions()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.is_current = TRUE THEN
    UPDATE public.service_forms
    SET    is_current = FALSE
    WHERE  service_id = NEW.service_id
      AND  id <> NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_demote_previous_form_versions
  AFTER INSERT OR UPDATE ON public.service_forms
  FOR EACH ROW EXECUTE FUNCTION public.demote_previous_form_versions();

CREATE TABLE public.form_questions (
  id                  UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id             UUID                NOT NULL REFERENCES public.service_forms (id) ON DELETE CASCADE,
  type                question_type       NOT NULL,
  label               VARCHAR(512)        NOT NULL,
  note                VARCHAR(1024),
  price_increase_type price_increase_type,
  price_increase      NUMERIC(10,2)       CHECK (price_increase IS NULL OR price_increase >= 0),
  is_required         BOOLEAN             NOT NULL DEFAULT FALSE,
  order_index         INT                 NOT NULL,

  UNIQUE (form_id, order_index),

  CONSTRAINT price_increase_consistency CHECK (
    (price_increase_type IS NULL) = (price_increase IS NULL)
  )
);

CREATE INDEX idx_form_questions_form_id ON public.form_questions (form_id, order_index);

-- only relevant for single_choice and multiple_choice questions

CREATE TABLE public.form_question_options (
  id                  UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id         UUID                NOT NULL REFERENCES public.form_questions (id) ON DELETE CASCADE,
  label               VARCHAR(512)        NOT NULL,
  price_increase_type price_increase_type,
  price_increase      NUMERIC(10,2)       CHECK (price_increase IS NULL OR price_increase >= 0),
  order_index         INT                 NOT NULL,

  UNIQUE (question_id, order_index),

  CONSTRAINT price_increase_consistency CHECK (
    (price_increase_type IS NULL) = (price_increase IS NULL)
  )
);

CREATE INDEX idx_form_question_options_question_id ON public.form_question_options (question_id, order_index);

-- ##### ORDERS #####

CREATE TABLE public.orders (
  id           UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID          NOT NULL REFERENCES auth.users (id),
  service_id   UUID          NOT NULL REFERENCES public.services (id),
  form_id      UUID          NOT NULL REFERENCES public.service_forms (id),
  status       order_status  NOT NULL DEFAULT 'pending',
  base_price   NUMERIC(10,2) NOT NULL CHECK (base_price >= 0),
  final_price  NUMERIC(10,2) CHECK (final_price IS NULL OR final_price >= 0),
  user_note    TEXT,
  admin_note   TEXT,
  deadline_at  TIMESTAMPTZ,
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id    ON public.orders (user_id);
CREATE INDEX idx_orders_service_id ON public.orders (service_id);
CREATE INDEX idx_orders_status     ON public.orders (status);

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- append only audit log of every status transition
-- trigger reads app.current_user_id from session-local settings
-- inside the same transaction before updating orders.status

CREATE TABLE public.order_status_history (
  id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id     UUID         NOT NULL REFERENCES public.orders (id) ON DELETE CASCADE,
  from_status  order_status,              -- NULL on the initial PENDING entry
  to_status    order_status NOT NULL,
  changed_by   UUID         NOT NULL REFERENCES auth.users (id),
  reason       TEXT,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_order_status_history_order_id ON public.order_status_history (order_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.log_order_status_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.order_status_history (order_id, from_status, to_status, changed_by, reason)
    VALUES (
      NEW.id,
      OLD.status,
      NEW.status,
      current_setting('app.current_user_id')::UUID,
      NULLIF(current_setting('app.status_change_reason', TRUE), '')
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_log_order_status_change
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.log_order_status_change();

-- append only log of every deadline change

CREATE TABLE public.deadline_history (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id          UUID        NOT NULL REFERENCES public.orders (id) ON DELETE CASCADE,
  previous_deadline TIMESTAMPTZ,
  new_deadline      TIMESTAMPTZ NOT NULL,
  reason            TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_deadline_history_order_id ON public.deadline_history (order_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.log_deadline_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF OLD.deadline_at IS DISTINCT FROM NEW.deadline_at
     AND NEW.deadline_at IS NOT NULL THEN
    INSERT INTO public.deadline_history (order_id, previous_deadline, new_deadline, reason)
    VALUES (
      NEW.id,
      OLD.deadline_at,
      NEW.deadline_at,
      NULLIF(current_setting('app.deadline_change_reason', TRUE), '')
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_log_deadline_change
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.log_deadline_change();

-- ##### SLOTS #####

-- keep slots_used in sync automatically

CREATE OR REPLACE FUNCTION public.update_slots_used()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  old_active BOOLEAN := OLD.status IN ('paid','in_progress','paused','delivered');
  new_active BOOLEAN := NEW.status IN ('paid','in_progress','paused','delivered');
BEGIN
  IF NOT old_active AND new_active THEN
    UPDATE public.services SET slots_used = slots_used + 1 WHERE id = NEW.service_id;
  ELSIF old_active AND NOT new_active THEN
    UPDATE public.services SET slots_used = GREATEST(slots_used - 1, 0) WHERE id = NEW.service_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_update_slots_used
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_slots_used();

-- ##### PAYMENTS #####

CREATE TABLE public.payments (
  id                  UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id            UUID           NOT NULL UNIQUE REFERENCES public.orders (id) ON DELETE CASCADE,
  amount              NUMERIC(10,2)  NOT NULL CHECK (amount > 0),
  status              payment_status NOT NULL DEFAULT 'pending',
  provider            VARCHAR(64)    NOT NULL,
  provider_payment_id VARCHAR(255),
  paid_at             TIMESTAMPTZ,
  refunded_at         TIMESTAMPTZ,
  refund_reason       TEXT,
  created_at          TIMESTAMPTZ    NOT NULL DEFAULT NOW(),

  CONSTRAINT refund_requires_paid CHECK (
    refunded_at IS NULL OR paid_at IS NOT NULL
  )
);

CREATE INDEX idx_payments_order_id ON public.payments (order_id);

-- ##### DELIVERABLES #####

-- uploaded by the admin
-- application logic moves the order to DELIVERED

CREATE TABLE public.order_deliverables (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID         NOT NULL REFERENCES public.orders (id) ON DELETE CASCADE,
  storage_key VARCHAR(512) NOT NULL,  -- Supabase Storage object path
  file_name   VARCHAR(255) NOT NULL,
  mime_type   VARCHAR(127) NOT NULL,
  size_bytes  BIGINT       NOT NULL CHECK (size_bytes > 0),
  uploaded_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_order_deliverables_order_id ON public.order_deliverables (order_id);

-- ##### INITIAL STATUS HISTORY #####
-- written on order insert

CREATE OR REPLACE FUNCTION public.log_initial_order_status()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO public.order_status_history (order_id, from_status, to_status, changed_by)
  VALUES (NEW.id, NULL, NEW.status, NEW.user_id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_log_initial_order_status
  AFTER INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.log_initial_order_status();

-- ##### RLS #####

ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_forms       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_questions      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deadline_history    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_deliverables  ENABLE ROW LEVEL SECURITY;

-- helper function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  );
$$;

-- profiles
CREATE POLICY "Users can read their own profile"
  ON public.profiles FOR SELECT
  USING (id = auth.uid() OR public.is_admin());

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid()
    -- prevent users from escalating their own role
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (public.is_admin());

-- conversations
CREATE POLICY "Users can access their own conversation"
  ON public.conversations FOR ALL
  USING (user_id = auth.uid() OR public.is_admin());

-- messages
CREATE POLICY "Participants can read messages"
  ON public.messages FOR SELECT
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Participants can insert messages"
  ON public.messages FOR INSERT
  WITH CHECK (
    user_id = auth.uid()
    AND (
      public.is_admin()
      OR EXISTS (
        SELECT 1 FROM public.conversations c
        WHERE c.id = conversation_id AND c.user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Sender can soft-delete their own messages"
  ON public.messages FOR UPDATE
  USING (user_id = auth.uid() OR public.is_admin());

-- message_attachments
CREATE POLICY "Participants can access attachments"
  ON public.message_attachments FOR ALL
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.messages m
      JOIN public.conversations c ON c.id = m.conversation_id
      WHERE m.id = message_id AND c.user_id = auth.uid()
    )
  );

-- services & forms (public read, admin write)
CREATE POLICY "Anyone can read active services"
  ON public.services FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage services"
  ON public.services FOR ALL
  USING (public.is_admin());

CREATE POLICY "Anyone can read current forms"
  ON public.service_forms FOR SELECT
  USING (is_current = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage forms"
  ON public.service_forms FOR ALL
  USING (public.is_admin());

CREATE POLICY "Anyone can read form questions"
  ON public.form_questions FOR SELECT USING (TRUE);

CREATE POLICY "Admins can manage form questions"
  ON public.form_questions FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can read form question options"
  ON public.form_question_options FOR SELECT USING (TRUE);

CREATE POLICY "Admins can manage form question options"
  ON public.form_question_options FOR ALL USING (public.is_admin());

-- orders
CREATE POLICY "Users can read their own orders"
  ON public.orders FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users can create their own orders"
  ON public.orders FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can update any order"
  ON public.orders FOR UPDATE
  USING (public.is_admin());

-- order_status_history
CREATE POLICY "Users can read their own order history"
  ON public.order_status_history FOR SELECT
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_id AND o.user_id = auth.uid()
    )
  );

-- deadline_history
CREATE POLICY "Users can read deadline history for their orders"
  ON public.deadline_history FOR SELECT
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_id AND o.user_id = auth.uid()
    )
  );

-- payments
CREATE POLICY "Users can read their own payment"
  ON public.payments FOR SELECT
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_id AND o.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage payments"
  ON public.payments FOR ALL
  USING (public.is_admin());

-- order_deliverables
CREATE POLICY "Users can read deliverables for completed/delivered orders"
  ON public.order_deliverables FOR SELECT
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_id
        AND o.user_id = auth.uid()
        AND o.status IN ('delivered', 'completed')
    )
  );

CREATE POLICY "Admins can manage deliverables"
  ON public.order_deliverables FOR ALL
  USING (public.is_admin());
