export interface ISiteMetadata {
  title: string;
  /**
   Default theme when web loaded
   */
  theme: 'system' | 'dark' | 'light';
  site: {
    /** Domain of your website without pathPrefix. */
    siteUrl: string;
    /** Alternative site title for SEO. */
    siteTitleAlt: string;
    /** Prefixes all links. For cases when deployed to example.github.io/blog-next/. */
    pathPrefix: string;
    /** Website description used for RSS feeds/meta description tag. */
    siteDescription: string;
    /** Logo used for SEO and manifest. */
    siteLogo: string;
    /** FB Application ID for using app insights */
    siteFBAppID: string;
  };
  /** author info for SEO */
  author: {
    userName: string; // Username to display in the author segment.
    userEmail: string; // Email used for RSS feed's author segment
    userTwitter: string;
    userGithub: string;
    userLocation: string; // User location to display in the author seg
  };
  posts: {
    /** the root of content directory, it can contains various type of contents e.g. 
    posts, pages */
    contentDirectory: string;
    postDirectory: string;
    assetsPublicPath: string;
    postMetadataPath: string;
  };
  tmpPath: string;
  components: {
    hero: IHero;
    footer: IFooter;
  };
  userLinks: IUserLink[];
}

export interface IHero {
  title: string;
  tagline: string;
}

export interface IUserLink {
  label: string;
  url: string;
  iconClassName: string;
}

export interface IFooter {
  sinceYear: number;
  copyright: string;
  tagline: string;
}
