import type { NavigationMenuItem } from '@nuxt/ui'
import type { DialogConfig } from './types'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  },

  /* Header */
  header: {
    navigationMenuItems: [
      {
        label: 'VGen',
        to: 'https://vgen.co/Yobune',
        target: '_blank'
      }
    ] as NavigationMenuItem[],

    cursor: {
      default: true,
      trueLabel: 'Cursor: Fancy',
      falseLabel: 'Cursor: Boring'
    },

    nsfw: {
      default: false,
      label: 'NSFW Mode'
    }
  },

  /* Dialog */
  dialog: {
    defaultActionLabel: 'Continue',
    speed: 20,
    image:
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/avatars/c994765a-609b-4db2-ad2a-fb476a540298.webp',
    scenes: [
      {
        id: 'intro',
        dialog:
          'Welcome to my page bla bla bla. I need some placeholder text, so please let this just look nice. Thank you.',
        actionLabel: 'Start the Tour'
      },
      {
        id: 'end',
        dialog: "That's the end of the tour i guess so yeah.",
        actionLabel: 'Finish'
      }
    ]
  } as DialogConfig
})
