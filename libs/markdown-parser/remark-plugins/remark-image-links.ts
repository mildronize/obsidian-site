// Adapted from original: https://github.com/Pondorasti/remark-img-links

import visit from 'unist-util-visit'; // Downgrade to v2.0.3 for supporting common js
import path from 'path';

interface IRemarkImageLinkOption {
  path: string;
}

export default function remarkImageLink(options: IRemarkImageLinkOption) {
  return (tree: any) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      'image',
      (node: any) => {
        // Sanitize URL by removing leading `/`
        const imageURL = node.url.replace(/^\//, '');
        if (!isAbsoluteURL(imageURL)) node.url = path.join(options.path, imageURL);
      }
    );
  };
}

export function isAbsoluteURL(url: string): boolean {
  try {
    new URL('', url);
  } catch (error: any) {
    const msg: string = error.message;
    if (msg.search('Invalid base URL') >= 0 || msg.search('Invalid URL') >= 0) return false;
    else {
      throw Error(`Can't validate absolute URL (${url}): ${error.message}`);
    }
  }
  return true;
}
