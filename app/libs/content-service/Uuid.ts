// Ported from https://github.com/mildronize/mildronize.github.io/blob/9f071e49d779e2db1c17482040ce8c4696db5a20/scripts/utils.ts

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const defaultUnicode = 'utf8';

export async function getUuidStore(markdownPaths: string[]) {
  const uuids: Record<string, string> = {};
  const readFileWorkers: Promise<any>[] = [];
  for (const mdPath of markdownPaths) {
    const absoluteMarkdownPath = path.resolve(mdPath);
    readFileWorkers.push(fs.readFile(absoluteMarkdownPath, defaultUnicode));
  }

  const readFiles = await Promise.all(readFileWorkers);
  readFiles.forEach((readFile, index) => {
    const frontmatter = matter(readFile);
    if (!Object.prototype.hasOwnProperty.call(frontmatter, 'data')) return;
    if (!Object.prototype.hasOwnProperty.call(frontmatter.data, 'uuid')) return;
    if (Object.prototype.hasOwnProperty.call(uuids, frontmatter.data.uuid))
      throw new Error('The uuid is duplicating, please fix this issue before run this command again');
    uuids[frontmatter.data.uuid] = markdownPaths[index];
  });

  return {
    uuidStore: uuids,
    markdownFiles: readFiles,
  };
}

export function retryNewUuid(uuidStore: Record<string, string>): string {
  const uuid = generateUUID(7);
  if (Object.prototype.hasOwnProperty.call(uuidStore, uuid)) {
    console.log('Retry... new uuid.');
    return retryNewUuid(uuidStore);
  }
  return uuid;
}

export function generateUUID(length: number) {
  // https://gist.github.com/6174/6062387
  if (length > 10) throw Error('No more than 10 chars');
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}
