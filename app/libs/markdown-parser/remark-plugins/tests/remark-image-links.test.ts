import remark from 'remark'; // Downgrade to v13.0.0 for supporting common js
import remarkImageLink from '../remark-image-links';

describe('remarkImageLink', () => {
  const cases = [
    ['![](cover.jpg)', '/posts/slug-id/', '![](/posts/slug-id/cover.jpg)'],
    ['![](error-sample.png)', '/posts/slug-id/', '![](/posts/slug-id/error-sample.png)'],
    // Not parse abs URL
    ['![](https://test.com/img.jpg)', '/posts/slug-id/', '![](https://test.com/img.jpg)'],
    ['![](http://test.com/img.jpg)', '/posts/slug-id/', '![](http://test.com/img.jpg)'],
  ];

  test.each(cases)(`remarkImageLink(%s,%s) should be %s`, async (markdown, contentPath, expected) => {
    const _result = await remark().use(remarkImageLink, { path: contentPath }).process(markdown);
    // trim newline
    const result = _result.toString().replace(/^\s+|\s+$/g, '');
    expect(result).toEqual(expected);
  });
});
