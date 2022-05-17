// @ts-check

/**
 * @type {import('./app/data/interfaces/ISiteMetadata').ISiteMetadata}
 */

// TODO: Check path is valid before start app

const siteMetadata = {
  title: 'Second Brain',
  theme: 'system',
  site: {
    siteUrl: 'https://v6.thadaw.com',
    siteTitleAlt: "Thada W.",
    pathPrefix: '/',
    siteDescription: 'You can find almost stuff about me: sharing ideas, programming techniques, web technology and others.',
    siteLogo: '/logos/android-chrome-512x512.png',
    siteFBAppID: "487836291329244",
  },
  author: {
    userName: "Thada Wangthammang", // Username to display in the author segment.
    userEmail: "thada.wth@gmail.com", // Email used for RSS feed's author segment
    userGithub: "mildronize",
    userTwitter: "mildronize",
    userLocation: "Songkhla, Thailand", // User location to display in the author segment.
  },
  posts: {
    contentDirectory: 'example-contents',
    postDirectory: 'example-contents/posts',
    assetsPublicPath: '/',
    postMetadataPath: '.posts.metadata.json',
  },
  tmpPath: '.tmp',
  components: {
    hero: {
      title: `Hi 👋 I\'m Thada, DevSecOps Engineer, welcome to my blog. `,
      tagline: `Sharing ideas, programming techniques, web technology and others.`,
    },
    footer: {
      sinceYear: 2015,
      copyright: 'thadaw.com',
      tagline: '<a href="https://github.com/mildronize/blog-next" target="_blank">v6.0.0</a> Built with ❤️ by Thada Wangthammang'
    },
  },
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: 'GitHub',
      url: 'https://github.com/mildronize',
      iconClassName: 'fab fa-github',
    },
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/mildronize/',
      iconClassName: 'fab fa-facebook',
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com/mildronize',
      iconClassName: 'fab fa-twitter',
    },
    {
      label: 'Email',
      url: 'mailto:thada.wth@gmail.com',
      iconClassName: 'fas fa-envelope',
    },
    {
      label: 'Linkedin',
      url: 'https://www.linkedin.com/in/thada-wangthammang-281894a6/',
      iconClassName: 'fab fa-linkedin',
    },
    {
      label: 'Medium',
      url: 'https://thadaw.medium.com/',
      iconClassName: 'fab fa-medium',
    },
    {
      label: 'RSS',
      url: '/rss',
      iconClassName: 'fas fa-rss',
    },
  ],
};

module.exports = siteMetadata;
