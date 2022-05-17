// Ported from https://github.com/mildronize/mildronize.github.io/blob/main/src/components/SEO/SEO.jsx

import Head from 'next/head';
import urljoin from 'url-join';
import { siteMetadata } from '@thadaw.com/data';
import { IPostSerializableJSON } from '@thadaw.com/libs/content-service';
import { getUnsplashImageURL } from '@thadaw.com/libs/utility';

export interface IMetaProps {
  pageTitle?: string;
  postNode?: Pick<
    IPostSerializableJSON,
    'date' | 'description' | 'excerpt' | 'cover' | 'shortURL' | 'unsplashImgCoverId'
  >;
  postSEO?: boolean;
}

const getImagePath = (imageURI: string) => {
  if (!imageURI) return;
  if (!imageURI.match(`(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]`))
    return urljoin(siteMetadata.site.siteUrl, siteMetadata.site.pathPrefix, imageURI);
  return imageURI;
};

export default function Meta({ pageTitle, postNode, postSEO = false }: IMetaProps) {
  let description;
  let image;
  let postURL;

  const title = pageTitle ? pageTitle : siteMetadata.title;
  const metaTitle = pageTitle ? `${pageTitle} | ${siteMetadata.title}` : siteMetadata.title;
  const datePublished = postNode?.date;

  if (postSEO) {
    description = postNode?.description ? postNode?.description : postNode?.excerpt;
    image = postNode?.cover;
    postURL = urljoin(siteMetadata.site.siteUrl, siteMetadata.site.pathPrefix, postNode?.shortURL || '');
  } else {
    description = siteMetadata.site.siteDescription;
    image = siteMetadata.site.siteLogo;
  }

  if (postNode?.unsplashImgCoverId) {
    image = getUnsplashImageURL(postNode?.unsplashImgCoverId);
  } else if (postNode?.cover) {
    image = urljoin(siteMetadata.site.siteUrl, postNode?.cover);
    image = getImagePath(image);
  }

  const authorJSONLD = {
    '@type': 'Person',
    name: siteMetadata.author.userName,
    email: siteMetadata.author.userEmail,
    address: siteMetadata.author.userLocation,
  };

  const logoJSONLD = {
    '@type': 'ImageObject',
    url: getImagePath(siteMetadata.site.siteLogo),
  };

  const blogURL = urljoin(siteMetadata.site.siteUrl, siteMetadata.site.pathPrefix);

  interface ISchemaOrgJSONLD {
    '@context': string;
    '@type': string;
    url?: string;
    name?: string;
    headline?: string;
    image?: any;
    author?: typeof authorJSONLD;
    publisher?: any;
    datePublished?: string;
    alternateName?: string;
    description?: string;
    itemListElement?: any[];
  }

  const schemaOrgJSONLD: ISchemaOrgJSONLD[] = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: blogURL,
      name: title,
      alternateName: siteMetadata.site.siteTitleAlt ? siteMetadata.site.siteTitleAlt : '',
    },
  ];
  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': postURL,
              name: title,
              image,
            },
          },
        ],
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url: blogURL,
        name: title,
        alternateName: siteMetadata.site.siteTitleAlt ? siteMetadata.site.siteTitleAlt : '',
        headline: title,
        image: { '@type': 'ImageObject', url: image },
        author: authorJSONLD,
        publisher: {
          ...authorJSONLD,
          '@type': 'Organization',
          logo: logoJSONLD,
        },
        datePublished: datePublished || '',
        description,
      }
    );
  }

  return (
    <Head>
      <title>{metaTitle}</title>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={postSEO ? postURL : blogURL} />
      {postSEO ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="fb:app_id" content={siteMetadata.site.siteFBAppID ? siteMetadata.site.siteFBAppID : ''} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteMetadata.author.userTwitter ? siteMetadata.author.userTwitter : ''} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
