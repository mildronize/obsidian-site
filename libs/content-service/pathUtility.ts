import * as date from 'date-fns';
import path from 'path';

/**
 * Returns a string that resolve actual filename
 * Ex.
 *  content path = _posts/preview/title-article/test.md
 *  the result = title-article (not `test`)
 *
 *  If structure markdown files as a directory
 *  ```
 *    ./2015-05-07-responsive-expanding-search-bar
 *     └── readme.md (any file, use info from parent)
 *  ```
 *
 * @param {string} prefixPath -
 * @param {string} contentPath -
 * @returns {string}
 */

export function getActualFilename(prefixPath: string, contentPath: string) {
  const parsedPrefixPath = prefixPath.replace(/^\/*/, '');
  const removedExtensionPath = contentPath.replace(/\.[^/.]+$/, '');
  const parsedPath = removedExtensionPath.replace(new RegExp(`${parsedPrefixPath}/*`), '');

  const split = parsedPath.split('/');

  if (split.length >= 2) return split[split.length - 2];
  return parsedPath;
}

export function getPostDirectory(prefixPath: string, contentPath: string = '') {
  const parsedPrefixPath = prefixPath.replace(/^\/*/, '');
  const parsedPath = contentPath.replace(new RegExp(`${parsedPrefixPath}/*`), '');
  const split = parsedPath.split('/');
  const paths = split.slice(0, split.length - 1);
  return paths.join('/');
}

export function extractDate(filename: string): Date | null {
  checkValidFilename(filename);
  const nodeDate = filename.split('-').slice(0, 3).join('-');
  const postDate = new Date(nodeDate);
  if (!date.isValid(postDate)) return null;
  return postDate;
}

export function extractFilenameSlug(filename: string): string {
  checkValidFilename(filename);
  const filenameRegex = /^(\d\d\d\d-\d\d-\d\d)-([\w-]+)$/;
  if (filenameRegex.test(filename)) {
    const matchResult = filename.match(filenameRegex);
    if (matchResult && matchResult?.length >= 2) {
      return matchResult[2];
    }
  }
  return filename;
}

function checkValidFilename(filename: string) {
  if (filename.search('/') > 0) {
    throw new Error(`Unexpected char '/', Invalid filename please call "getActualFilename" first`);
  }
}

// --------------------------
