import { filterRecord } from '../utility';

describe('filterRecord', () => {
  type Case = {
    object: Record<string, any>;
    keys: string[];
    expected: Record<string, any>;
  };

  const cases: Case[] = [
    { object: { title: 'test', slug: 'test-slug' }, keys: ['slug'], expected: { slug: 'test-slug' } },
  ];

  test.each(cases)(`filterRecord(%s, %s) should be %s`, ({ object, keys, expected }) => {
    expect(filterRecord(object, keys)).toEqual(expected);
  });
});
