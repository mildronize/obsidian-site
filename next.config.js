// const fs = require('fs/promises');
// const path = require('path');
// const siteMetadata = require('./data/siteMetadata');
// const { generatePostMetadata } = require('./scripts/libs/content-service');

// async function generateShortUrlRedirects() {
//   await generatePostMetadata();
//   const postMetadataPath = path.join(siteMetadata.tmpPath, siteMetadata.posts.postMetadataPath);
//   /**
//    * @type import('./libs/postDataProvider').PostMetadataMap
//    */
//   const postMetadataMap = JSON.parse(await fs.readFile(postMetadataPath, 'utf8'));
//   const redirects = [];
//   for (const [slug, postMetadata] of Object.entries(postMetadataMap)) {
//     redirects.push({
//       destination: `/posts/${slug}`,
//       source: `/s/${postMetadata.uuid}`,
//       permanent: true,
//     });
//   }

//   return redirects;
// }

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Using trailing to prevent ERR_TOO_MANY_REDIRECTS when path is /posts
  trailingSlash: true,
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/posts': { page: '/posts' },
      '/about': { page: '/about' },
      '/talks': { page: '/talks' },
    };
  },
  // Note == rewrites, redirects, and headers are not applied when exporting your application, detected (redirects). See more info here: https://nextjs.org/docs/messages/export-no-custom-routes
  // redirects: async function () {
  //   return generateShortUrlRedirects();
  // },
  // When error like this: https://stackoverflow.com/questions/64926174/module-not-found-cant-resolve-fs-in-next-js-application
  //
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = {
  //     fs: false,
  //     path: false,
  //     process: false,
  //     util: false,
  //     events: false,
  //     assert: false,
  //     buffer: false,

  //    };

  //   return config;
  // },
};

module.exports = nextConfig;
