declare module 'excerpt-html' {
  function _exports(
    html: string,
    options?: {
      moreRegExp?: RegExp;
      stripTags?: boolean;
      pruneLength?: number;
      pruneSeparator?: string;
      pruneString?: string;
    }
  ): string;
  export = _exports;
}
