import path from 'path';

export const postPath = (slug: string) => path.join(`/posts/`, slug);

export const getUnsplashImageURL = (imageId: string, width = 900, height = 600) => {
  return `https://source.unsplash.com/${imageId}/${width}x${height}`;
};
