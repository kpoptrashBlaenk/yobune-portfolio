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
    ],

    cursor: {
      default: true,
      trueLabel: 'Cursor: Fancy',
      falseLabel: 'Cursor: Boring'
    },

    nsfw: {
      default: false,
      label: 'NSFW Mode'
    }
  }
})
