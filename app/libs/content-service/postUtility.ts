import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import _glob from 'glob';

import siteMetadata from '@thadaw.com/data/siteMetadata';
import PostData, { IPostSerializableJSON } from './PostData';
import generatePostMetadata, { getPostMetadataMap } from './generatePostMetadata';
import { FilterRecord, filterRecord } from './utility';

const glob = promisify(_glob);
const defaultUnicode = 'utf8';

const tmpPath = siteMetadata.tmpPath;
const postMetadataPath = path.join(tmpPath, siteMetadata.posts.postMetadataPath);

export interface IPostMetadata {
  path: string;
  uuid?: string;
  postData?: PostData;
}

export type PostMetadataMap = Record<string, IPostMetadata>;

function getPostData(postMetadataPath: string, slug: string) {
  // TODO: validate JSON format
  const postMetadataMap: PostMetadataMap = JSON.parse(fs.readFileSync(postMetadataPath, defaultUnicode));
  const contentPath = postMetadataMap[slug].path;
  const fileContent = fs.readFileSync(contentPath, defaultUnicode);
  return new PostData(contentPath, fileContent);
}

// Using Generic type `U extends keyof IPostSerializableJSON` for return only
// field that selects
export async function getContentBySlug<U extends keyof IPostSerializableJSON>(
  slug: string,
  fields: U[] = [],
  postData?: PostData
) {
  // Reuse postData
  const _postData = postData ? postData : getPostData(postMetadataPath, slug);
  if (!_postData) throw new Error(`postData should be assigned.`);

  // inject uuid if no uuid
  await _postData.injectUUID();

  // Load PostData to Serializable JSON which supported by Next.js API
  const postSerializableJSON = _postData.toJSON();

  // Ensure only the minimal needed data is exposed
  // https://nextjs.org/docs/messages/large-page-data
  return filterRecord(postSerializableJSON, fields);
}

type OrderType = 'ASC' | 'DESC';
type Where = {
  slug?: string;
  // tag?: string;
  // categroy: string;
};
type OrderBy = {
  date: OrderType;
};

interface IQueryContentOption {
  offset?: number;
  limit?: number;
  orderBy?: OrderBy;
  where?: Where;
}

export async function getAllContents<U extends keyof IPostSerializableJSON>(
  fields: U[] = []
): Promise<FilterRecord<IPostSerializableJSON, U>[]> {
  const slugData = await generatePostMetadata();

  const postWorkers: Promise<FilterRecord<IPostSerializableJSON, U>>[] = [];
  for (const slug of Object.keys(slugData)) {
    const data = slugData[slug];
    postWorkers.push(getContentBySlug(slug, fields, data.postData));
  }
  const posts = await Promise.all(postWorkers);
  return posts;
}

// // @ts-expect-error

export async function queryContent<U extends keyof IPostSerializableJSON>(
  fields: U[] = [],
  options?: IQueryContentOption
) {
  let posts = await getAllContents(fields);
  if (!options) return posts;
  // 1: WHERE
  if (options?.where) {
    posts = whereContent(posts, fields, options.where);
  }
  // 2: ORDER
  if (options?.orderBy?.date) {
    posts = orderContentByDate(posts, fields, options.orderBy?.date);
  }
  // 3: LIMIT
  if (options?.limit) {
    const offset = options?.offset ? options?.offset : 0;
    posts = posts.slice(offset, options?.limit + offset);
  }
  return posts;
}

function whereContent(posts: IPostSerializableJSON[], fields: (keyof IPostSerializableJSON)[] = [], where: Where) {
  if (fields.indexOf('slug') < 0) throw new Error('Slug is require for using where option');
  return posts.filter(post => {
    if (post.slug === where?.slug) {
      return post;
    }
  });
}

function orderContentByDate(
  posts: IPostSerializableJSON[],
  fields: (keyof IPostSerializableJSON)[] = [],
  orderBy: OrderType
) {
  if (fields.indexOf('date') < 0) throw new Error('Using sorting by date is requried field date');
  const sortCondition: Record<OrderType, { true: number; false: number }> = {
    ASC: { true: 1, false: -1 },
    DESC: { true: -1, false: 1 },
  };
  return posts.sort((post1, post2) =>
    post1.date && post2.date
      ? post1.date > post2.date
        ? sortCondition[orderBy].true
        : sortCondition[orderBy].false
      : 1
  );
}

/**
 * Better performance than using queryContent(['slug']);
 */

export async function getAllContentOnlySlug(): Promise<Pick<IPostSerializableJSON, 'slug'>[]> {
  const postMetadataMap = await getPostMetadataMap();
  // Fallback to original method if no metadata file
  if (Object.keys(postMetadataMap).length === 0) return await queryContent(['slug']);
  const posts: Pick<IPostSerializableJSON, 'slug'>[] = [];
  for (const slug of Object.keys(postMetadataMap)) {
    posts.push({
      slug,
    });
  }
  return posts;
}

export async function getAllMarkdownPaths() {
  return glob(path.join(siteMetadata.posts.postDirectory, '**/*.md'));
}
