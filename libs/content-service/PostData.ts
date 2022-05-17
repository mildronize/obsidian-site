import matter from 'gray-matter';
import fs from 'fs/promises';
import excerptHtml from 'excerpt-html';
import { getActualFilename, extractDate, extractFilenameSlug } from './pathUtility';
import { retryNewUuid, getUuidStore, generateUUID } from './Uuid';
import { getAllMarkdownPaths } from './postUtility';
import siteMetadata from '@thadaw.com/data/siteMetadata';
import _ from 'lodash';
const { posts } = siteMetadata;
const defaultUnicode = 'utf8';

// Merge type
interface IPostData extends IFrontmatter, IField {}
// Remove non-serializable fields
type SerializablePostData = Partial<Omit<IPostData, 'actualDate'>>;
/**
 *  Data which export to API should be Serializable to JSON passing following Next.js function:
 *  getStaticProps, getServerSideProps, or getInitialProps
 */

export interface IPostSerializableJSON extends SerializablePostData {
  date?: string | null;
  content?: string;
}

export interface IFrontmatter {
  title?: string;
  uuid?: string;
  cover?: string;
  description?: string;
  unsplashImgCoverId?: string;
}

export interface IField {
  slug: string;
  actualDate: Date | null;
  path: string;
  filenameSlug: string;
  excerpt: string;
  shortURL: string | null;
}

export default class PostData {
  public frontmatter: IFrontmatter;
  public field: IField;
  public content: string;

  constructor(relativePath: string, markdown: string) {
    const { data, content } = matter(markdown);
    const filename = getActualFilename(posts.postDirectory, relativePath);
    // TODO: Validate object when load from string
    this.frontmatter = this.importFrontmatter(data);
    const date = extractDate(filename);
    this.content = content;
    this.field = {
      slug: this.generateSlug(),
      actualDate: date,
      path: relativePath,
      filenameSlug: extractFilenameSlug(filename),
      excerpt: this.convertHtmlToExcerpt(content),
      shortURL: this.getShortURL(),
    };
  }

  private importFrontmatter({ title, uuid, cover, description, unsplashImgCoverId }: Record<string, any>) {
    const result: IFrontmatter = {
      title,
      uuid,
      cover,
      description,
      unsplashImgCoverId,
    };
    return result;
  }

  private generateSlug() {
    // Frontmatter title or filename slug
    const readableSlug = _.kebabCase(this.frontmatter.title || this.field.filenameSlug);
    let uuid;
    if (!('uuid' in this.frontmatter)) {
      // create tmp UUID
      uuid = generateUUID(7);
    } else {
      uuid = this.frontmatter.uuid;
    }
    return `${readableSlug}-${uuid}`;
  }

  private convertHtmlToExcerpt(htmlCode: string) {
    // 140 chars for thai, 55 for eng
    return excerptHtml(htmlCode, {
      stripTags: true, // Set to false to get html code
      pruneLength: 140, // Amount of characters that the excerpt should contain
      pruneString: '…', // Character that will be added to the pruned string
      pruneSeparator: ' ', // Separator to be used to separate words
    });
  }

  private getShortURL() {
    return this.frontmatter.uuid ? `/s/${this.frontmatter.uuid}` : null;
  }

  public async injectUUID() {
    let uuid = '';
    if (!('uuid' in this.frontmatter)) {
      const markdownPaths = await getAllMarkdownPaths();
      console.log(markdownPaths);
      const { uuidStore } = await getUuidStore(markdownPaths);
      uuid = retryNewUuid(uuidStore);
      this.frontmatter.uuid = uuid;
      await fs.writeFile(this.field.path, matter.stringify(this.content, this.frontmatter), defaultUnicode);
    }
    return uuid;
  }

  /**
   * @returns Export to Serializable JSON which supported by Next.js API
   */

  public toJSON(): IPostSerializableJSON {
    return {
      title: this.frontmatter.title,
      date: this.field.actualDate?.toISOString() || null,
      slug: this.field.slug,
      path: this.field.path,
      content: this.content,
    };
  }
}
