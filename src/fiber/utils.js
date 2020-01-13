import { omit } from 'underscore';

export const diff = (a, b) => omit(a, (v, k) => b[k] === v);
