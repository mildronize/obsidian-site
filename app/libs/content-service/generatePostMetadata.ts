import fs from 'fs';
import path from 'path';

import siteMetadata from '@thadaw.com/data/siteMetadata';
import PostData from './PostData';
import { PostMetadataMap, getAllMarkdownPaths } from './postUtility';

const defaultUnicode = 'utf8';

const tmpPath = siteMetadata.tmpPath;
const postMetadataPath = path.join(tmpPath, siteMetadata.posts.postMetadataPath);

export async function getPostMetadataMap() {
  let postMetadataMap: PostMetadataMap = {};
  try {
    // Make dev mode work when the slug name is changed
    // Load the old slug.
    postMetadataMap = JSON.parse(fs.readFileSync(postMetadataPath, defaultUnicode));
  } catch (e) {
    console.debug(`No exisitng "${postMetadataPath}" file.`);
  }
  return postMetadataMap;
}

export default async function generatePostMetadata() {
  const mdPaths = await getAllMarkdownPaths();
  let postMetadataMap: PostMetadataMap = await getPostMetadataMap();

  for (const mdPath of mdPaths) {
    // TODO: use Async
    const fileContents = fs.readFileSync(mdPath, defaultUnicode);
    const postData = new PostData(mdPath, fileContents);
    const slug = postData.field.slug;
    postMetadataMap[slug] = {
      path: mdPath,
      postData,
      uuid: postData.frontmatter.uuid || '',
    };
  }

  if (!fs.existsSync(tmpPath)) {
    fs.mkdirSync(tmpPath, { recursive: true });
  }

  const minifiedPostMetadataMap: PostMetadataMap = {};
  for (const [slug, postMetadata] of Object.entries(postMetadataMap)) {
    minifiedPostMetadataMap[slug] = {
      path: postMetadata.path,
      uuid: postMetadata.uuid,
    };
  }
  fs.writeFileSync(postMetadataPath, JSON.stringify(minifiedPostMetadataMap, null, 2), defaultUnicode);
  console.debug(`Writing... "${postMetadataPath}" file.`);
  return postMetadataMap;
}
