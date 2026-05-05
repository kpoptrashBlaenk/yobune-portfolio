import type { NavigationMenuItem } from '@nuxt/ui'
import { DialogId, type DialogConfig } from './types'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  },

  /* Titles */
  titles: {
    animatedBanners: 'Animated Banners',
    ohterAnimations: 'Other Animations'
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
        id: DialogId.Intro,
        dialog:
          "Welcome to the world of YobuneArt! I'm Pinky, your tour guide! Would you like me to show you around? :3",
        actionLabel: 'Start the Tour'
      },
      {
        id: DialogId.Banners,
        dialog:
          'Here are some animated banners I created! They are very loooooong, which is perfect for Discord, Twitch or Youtube! :O'
      },
      {
        id: DialogId.Animations,
        dialog: 'I also do some other animations. Anything your heart desires! c:'
      },
      {
        id: DialogId.End,
        dialog: "So that's the end of the line, I hope you had fun during your stay! =w=",
        actionLabel: 'Finish'
      }
    ]
  } as DialogConfig
})
