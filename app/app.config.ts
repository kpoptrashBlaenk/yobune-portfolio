import type { NavigationMenuItem } from '@nuxt/ui'
import {
  DialogId,
  type AnimationsConfig,
  type BannersConfig,
  type CharacterSheetsConfig,
  type DialogConfig,
  type HeaderConfig,
  type HeroConfig,
  type ImagesConfig,
  type NsfwConfig,
  type WorkConfig
} from './types'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  },

  /* Titles */
  titles: {
    main: 'YobuneArt',
    animatedBanners: 'Animated Banners',
    ohterAnimations: 'Other Animations',
    characterSheets: 'Character Sheets',
    otherImages: 'Other Images',
    nsfwGallery: 'NSFW Section',
    work: 'About my work'
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
        dialog: 'Of course I do other types of animations as well. Anything your heart desires! c:'
      },
      {
        id: DialogId.Characters,
        dialog:
          'I also do character sheets! I am always ready if you need to create a creative visualization of your original character! >:3'
      },
      {
        id: DialogId.Images,
        dialog: 'There is a lot more, but here are some of my favorite images I created! :3'
      },
      {
        id: DialogId.Nsfw,
        dialog:
          "I also do spicy stuff! It's blurred because I am family friendly of course. But you can turn on NSFW above... pervert. x.x"
      },
      {
        id: DialogId.Work,
        dialog:
          "If you're interested, you can also see how exactly I work and treat my drawings! òwó"
      },
      {
        id: DialogId.End,
        dialog: "So that's the end of the line, I hope you had fun during your stay! =w=",
        actionLabel: 'Finish'
      }
    ]
  } as DialogConfig,

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
    }
  } as HeaderConfig,

  /* Hero */
  hero: {
    image:
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/e198f740-163a-47af-a63f-10145fb575e0.webp'
  } as HeroConfig,

  /* Banner Animations */
  banners: {
    banners: [
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/e198f740-163a-47af-a63f-10145fb575e0.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/XG3TRVGMJR/27cc5a98-7745-4fd4-886f-59d165d79301.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/RNMWEFXTHDKO/26d50697-3a68-4dc3-b7e0-c2530274d7d5.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/FAKDW5SPLSO/85d39bbb-b06d-4b25-b661-3e924a075101.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/XG3TRVGMJR/27cc5a98-7745-4fd4-886f-59d165d79301.webp'
    ]
  } as BannersConfig,

  /* Animations */
  animations: {
    animations: [
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/MCT9PHAYBCC9/26d2abc4-7caf-4eb5-94ed-b978493bb79a.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/L6BSYA7JQRND/17777c91-602b-487f-aff8-d364dc8b3e15.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/EEBQUSIFGW8I/bb7c29c6-0661-445e-8e3f-8d6ec450e14d.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/CC5QOX5GVFIU/3694a62e-a6b0-4097-9d3c-faab5d8057f8.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/91XN5ANXG41H/9ada06cb-1cb7-4d2e-91c2-f3d1713fe1fe.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/5QCQRTILBHL/35d9b1db-4716-480f-8ee2-3bbc15469063.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/6WTPYFEORI/c98da1e0-aff5-4d1a-ba0d-214151f076dd.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/RROAGWUPAKQ/24411889-c43e-43cf-9a47-5641c382e3c0.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/2GW9XK5H8XE8/d63ec00f-d667-4bef-9f10-7320c2cd693c.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/e198f740-163a-47af-a63f-10145fb575e0.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/XG3TRVGMJR/27cc5a98-7745-4fd4-886f-59d165d79301.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/RNMWEFXTHDKO/26d50697-3a68-4dc3-b7e0-c2530274d7d5.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/XG3TRVGMJR/27cc5a98-7745-4fd4-886f-59d165d79301.webp'
    ]
  } as AnimationsConfig,

  /* Character Sheets */
  sheets: {
    sheets: [
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/JO7E9JL9YO23/4db35e1b-6594-42c1-bd08-d4d1542b2f54.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/portfolio/00951ade-1a47-4a57-b38f-c4fec02bdb8e.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/H4JR2C4AANWO/934cae0f-04d5-4bca-8a86-48a65859b3bf.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/S92HAE8KQRK/c05c2dea-0fbc-4d58-8b85-0f0b88770c25.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/647KP5RYGVXD/8aeb1550-06de-4ca1-8463-36f371987319.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/9EU3UEU1PCVU/46e63263-d71a-47e6-aff6-8274f286df14.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/17JC51GUI32/68080640-a85b-4ed7-9164-5c61612a1de6.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/29GENWPUDA1U/9fe02eea-2eaf-4241-b182-750656e66461.webp'
    ]
  } as CharacterSheetsConfig,

  /* Images */
  images: {
    images: [
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/HM8PHRKAHQCR/70901a93-daef-44d5-9aec-c3488e6747c1.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/YP7DP5PVVUU2/9db90ad1-7f97-432a-a5de-d2cc9e88d5bb.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/KTQ12A7KRW78/1e96742e-5475-40c0-8f1b-3fab54e6202b.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/4LOCI5ORW0AK/4b680754-8cce-4919-937b-2fc9a5e05117.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/1Y3NR2DFSKQF/ba54ca5c-25c8-4208-82f6-00c734d67ab9.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/portfolio/e4fd6710-f263-43a7-82a2-599abf8feaae.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/C29UE92RJKCI/3019a6af-2b76-4546-b0c2-84b3ee4a90a8.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/QXVWR8B4DQ29/6d1b247a-f91b-4718-91d7-5035f6f9724a.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/portfolio/100e6662-bd27-4a11-9c15-5c48a147d008.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/portfolio/f2c5b316-344f-40ed-a575-0925d5b097ce.webp'
    ]
  } as ImagesConfig,

  /* Nsfw */
  nsfw: {
    default: false,
    label: 'NSFW Mode',
    images: [
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/HM8PHRKAHQCR/70901a93-daef-44d5-9aec-c3488e6747c1.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/YP7DP5PVVUU2/9db90ad1-7f97-432a-a5de-d2cc9e88d5bb.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/KTQ12A7KRW78/1e96742e-5475-40c0-8f1b-3fab54e6202b.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/4LOCI5ORW0AK/4b680754-8cce-4919-937b-2fc9a5e05117.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/1Y3NR2DFSKQF/ba54ca5c-25c8-4208-82f6-00c734d67ab9.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/portfolio/e4fd6710-f263-43a7-82a2-599abf8feaae.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/C29UE92RJKCI/3019a6af-2b76-4546-b0c2-84b3ee4a90a8.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/QXVWR8B4DQ29/6d1b247a-f91b-4718-91d7-5035f6f9724a.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/portfolio/100e6662-bd27-4a11-9c15-5c48a147d008.webp',
      'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/portfolio/f2c5b316-344f-40ed-a575-0925d5b097ce.webp'
    ]
  } as NsfwConfig,

  /* About Work */
  work: {
    timelapse: {
      title: 'Timelapse',
      video:
        'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/RNMWEFXTHDKO/26d50697-3a68-4dc3-b7e0-c2530274d7d5.webm'
    },
    quality: {
      title: 'Full HD vs UHD',
      low: 'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/C29UE92RJKCI/3019a6af-2b76-4546-b0c2-84b3ee4a90a8.webp',
      high: 'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/portfolio/100e6662-bd27-4a11-9c15-5c48a147d008.webp'
    },
    process: {
      title: 'Work Process',
      items: [
        {
          title: 'First Step',
          image:
            'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/HM8PHRKAHQCR/70901a93-daef-44d5-9aec-c3488e6747c1.webp'
        },
        {
          title: 'Second Step',
          image:
            'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/YP7DP5PVVUU2/9db90ad1-7f97-432a-a5de-d2cc9e88d5bb.webp'
        },
        {
          title: 'Third Step',
          image:
            'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/KTQ12A7KRW78/1e96742e-5475-40c0-8f1b-3fab54e6202b.webp'
        }
      ]
    }
  } as WorkConfig
})
