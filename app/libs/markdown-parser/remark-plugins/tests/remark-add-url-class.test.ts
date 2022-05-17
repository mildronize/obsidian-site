import remark from 'remark'; // Downgrade to v13.0.0 for supporting common js
import remarkHtml from 'remark-html';
import remarkAddUrlClass from '../remark-add-url-class';

describe('remarkAddUrlClass', () => {
  const cases = [
    ['[](cover.jpg)', '', '<p><a href="cover.jpg"></a></p>'],
    [
      '[https://thadaw.com](https://thadaw.com)',
      '',
      '<p><a href="https://thadaw.com" class="url">https://thadaw.com</a></p>',
    ],
    ['[](https://thadaw.com)', '', '<p><a href="https://thadaw.com"></a></p>'],
    ['[](http://thadaw.com)', '', '<p><a href="http://thadaw.com"></a></p>'],
    ['[](www.thadaw.com)', '', '<p><a href="www.thadaw.com"></a></p>'],
    // Custom Class name
    [
      '[https://thadaw.com](https://thadaw.com)',
      'my-url',
      '<p><a href="https://thadaw.com" class="my-url">https://thadaw.com</a></p>',
    ],
  ];

  test.each(cases)(`remarkAddUrlClass(%s,{className='%s'}) should be %s`, async (markdown, className, expected) => {
    const _className = className === '' ? undefined : className;
    const _result = await remark()
      .use(remarkAddUrlClass, { className: _className })
      // Use sanitize false to preserve class name
      .use(remarkHtml, { sanitize: false })
      .process(markdown);
    // trim newline
    const result = _result.toString().replace(/^\s+|\s+$/g, '');
    expect(result).toEqual(expected);
  });
});
