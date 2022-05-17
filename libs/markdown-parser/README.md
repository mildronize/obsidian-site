# markdown-parser

for processing markdown

Jest 27.5.1, doesn't support ESM natively. [Jest ships with experimental support for ECMAScript Modules (ESM).](https://jestjs.io/docs/ecmascript-modules).

This package uses  the downgrade version of npm to support npm:
- remark@13.0.0
- unist-util-visit@2.0.3
- remark-gfm@v1.0.0

Note: Due jest run in common js by defualt. I cannot setup Jest to Support ESM.


## More Resource

- Basic Remark.js https://www.ryanfiller.com/blog/remark-and-rehype-plugins