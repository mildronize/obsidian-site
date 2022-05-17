import visit from 'unist-util-visit'; // Downgrade to v2.0.3 for supporting common js

interface IRemarkAddUrlClassOption {
  className?: string;
}

// https://stackoverflow.com/a/17773849/4540808
const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

/**
 * Add Custom Class name when Link is a URL
 * @param options
 * @returns
 */

export default function remarkAddUrlClass(options?: IRemarkAddUrlClassOption) {
  return (tree: any) => {
    const className = options?.className ? options?.className : 'url';

    visit(
      tree,
      // only visit a tag
      'link',
      (node: any) => {
        // Process node
        // Ref: https://www.ryanfiller.com/blog/remark-and-rehype-plugins#reworking-attributes-on-an-existing-element
        const data = node.data || (node.data = {});
        // Ref: https://github.com/syntax-tree/mdast-util-to-hast#hproperties
        const props = data.hProperties || (data.hProperties = {});
        // console.log(node.url , node.children[0].value);
        if (urlRegex.test(node.children[0]?.value)) {
          props.class = className;
        }
      }
    );
  };
}
