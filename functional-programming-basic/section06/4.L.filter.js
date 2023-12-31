import { log } from '../utils';

L.filter = function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
};
let it = L.filter((a) => a % 2, [1, 2, 3, 4]);
log([...it]);
