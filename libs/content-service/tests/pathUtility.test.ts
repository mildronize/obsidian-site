import {
  getActualFilename,
  extractDate,
  extractFilenameSlug,
  getPostDirectory,
} from '@thadaw.com/libs/content-service/pathUtility';

describe('getActualFilename', () => {
  const cases = [
    ['_posts', '_posts/preview.md', 'preview'],
    ['_posts', '_posts/preview/test.md', 'preview'],
    ['_posts', '_posts/preview/title-article/test.md', 'title-article'],
    ['_posts', '_posts/preview.mdx', 'preview'],
    ['_posts', '_posts/preview', 'preview'],
    ['/_posts', '_posts/preview', 'preview'],
    ['//_posts', '_posts/preview', 'preview'],
    ['_posts/', '_posts/preview', 'preview'],
    ['/_posts/', '_posts/preview', 'preview'],
    ['_posts', 'preview.md', 'preview'],
    ['_contents/posts', '_contents/posts/title-article/preview.md', 'title-article'],
    // With Date
    ['_posts', '_posts/2022-04-22-preview.md', '2022-04-22-preview'],
    [
      '../_contents/posts',
      '../_contents/posts/examples/2022-04-20-hello-world/2022-04-20-hello-world.md',
      '2022-04-20-hello-world',
    ],
    ['../../_contents/posts', '../../_contents/posts/2022-04-22-preview/index.md', '2022-04-22-preview'],
  ];

  test.each(cases)(`getActualFilename(%s,%s) should be %s`, (prefixPath, contentPath, expected) => {
    expect(getActualFilename(prefixPath, contentPath)).toEqual(expected);
  });
});

describe('extractDate', () => {
  type Case = {
    filename: string;
    expected: Date | null;
  };
  const cases: Case[] = [
    { filename: 'preview', expected: null },
    { filename: '2022-04-22', expected: new Date('2022-04-22') },
    { filename: '2022-04-22-22', expected: new Date('2022-04-22') },
    { filename: '2022-04-222', expected: null },
  ];

  test.each(cases)(`extractDate(%s) should be %p`, ({ filename, expected }) => {
    expect(extractDate(filename)).toEqual(expected);
  });

  test('Check throw error', () => {
    expect(() => extractDate('_posts/preview')).toThrow(
      `Unexpected char '/', Invalid filename please call "getActualFilename" first`
    );
  });
});

describe('extractFilenameSlug', () => {
  type Case = {
    filename: string;
    expected: string;
  };

  const cases: Case[] = [
    { filename: 'preview', expected: 'preview' },
    { filename: '2022-04-22-preview', expected: 'preview' },
    // If invalid date, return original name
    { filename: '2022-04-2-preview-111', expected: '2022-04-2-preview-111' },
  ];

  test.each(cases)(`extractFilenameSlug(%s) should be %s`, ({ filename, expected }) => {
    expect(extractFilenameSlug(filename)).toEqual(expected);
  });

  test('Check throw error', () => {
    expect(() => extractFilenameSlug('_posts/preview')).toThrow(
      `Unexpected char '/', Invalid filename please call "getActualFilename" first`
    );
  });
});

describe('getPostDirectory', () => {
  type Case = {
    prefixPath: string;
    contentPath: string;
    expected: string;
  };

  const cases: Case[] = [
    { prefixPath: '_post', contentPath: '_post/preview/test/my-post/readme.md', expected: 'preview/test/my-post' },
    { prefixPath: '_post', contentPath: '_post/preview/test.md', expected: 'preview' },
    { prefixPath: '_post', contentPath: '_post/preview.md', expected: '' },
    { prefixPath: '_contents', contentPath: '_contents/post/preview.md', expected: 'post' },
  ];

  test.each(cases)(`getPostDirectory(%s, %s) should be %s`, ({ prefixPath, contentPath, expected }) => {
    expect(getPostDirectory(prefixPath, contentPath)).toEqual(expected);
  });
});
