type PageConfig = { url: string }

export const PAGES = {
  // Home
  home: {
    url: '/'
  },

  // Profile
  profile: {
    url: '/profile'
  }
} satisfies Record<string, PageConfig>
