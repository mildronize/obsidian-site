import { postPath } from '../utility';

describe('postPath', () => {
  type Case = {
    slug: string;
    expected: string;
  };

  const cases: Case[] = [
    { slug: 'my-slug', expected: '/posts/my-slug' },
    { slug: '/my-slug', expected: '/posts/my-slug' },
  ];

  test.each(cases)(`postPath(%s) should be %s`, ({ slug, expected }) => {
    expect(postPath(slug)).toEqual(expected);
  });
});
