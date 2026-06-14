type PageConfig = { url: string }

export const PAGES = {
  // Home
  home: {
    url: '/'
  },

  // Profile
  profile: {
    url: '/profile'
  },

  // Login
  login: {
    url: '/auth/login'
  }
} satisfies Record<string, PageConfig>
