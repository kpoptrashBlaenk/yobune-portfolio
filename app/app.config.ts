export default defineAppConfig({
  ui: {
    // Colors
    colors: {
      primary: 'yellow',
      secondary: 'zinc',
      neutral: 'zinc'
    },

    // Header
    header: {
      slots: {
        title: 'text-secondary',
        body: 'h-full',
        toggle: 'sm:hidden'
      }
    },

    // Footer
    footer: {
      slots: {
        root: 'text-muted text-sm',
        container: 'flex! justify-between',
        bottom:
          'flex flex-col sm:flex-row items-center justify-center gap-2 py-2! text-sm text-muted bg-muted border-t border-default',
        left: 'flex flex-col items-start justify-start mt-0 order-0',
        center: 'order-1 mt-0',
        right: 'flex flex-col items-end justify-start mt-0 order-2'
      }
    },

    // Navigation Menu
    navigationMenu: {
      slots: {
        item: 'cursor-default!',
        link: 'rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-default',
        linkLabel: 'text-neutral-700 dark:text-neutral-200'
      }
    },

    // Avatar
    avatar: {
      defaultVariants: {
        color: 'primary'
      },
      slots: {
        root: 'ring ring-primary'
      }
    },

    // Modal
    modal: {
      slots: {
        content: 'w-auto max-w-[85vw] max-h-[85vh] rounded-xl',
        overlay: 'cursor-pointer'
      }
    }
  }
})
