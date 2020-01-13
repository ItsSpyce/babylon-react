import { omit } from 'underscore';

export const diff = (a, b) => omit(a, (v, k) => b[k] === v);

// credit to https://gist.github.com/jed/982883, he's a genius
export const uuidv4 = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
