// Read More: https://rossbulat.medium.com/typescript-typing-dynamic-objects-and-subsets-with-generics-44ba3988a91a

/**
 * Get only some keys and return the correct key
 */

// Use Partial for using some element
export type FilterRecord<T, U extends keyof T> = Partial<{ [K in U]: T[K] }>;

export function filterRecord<T, U extends keyof T>(obj: T, keys: U[]) {
  const result: FilterRecord<T, U> = {};
  keys.forEach(key => {
    if (typeof obj[key] !== 'undefined') {
      result[key] = obj[key];
    }
  });
  return result;
}
