import { log, pipe, takeAll } from '../utils.js';

const isIterable = (a) => a && a[Symbol.iterator];
const L = {};

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) for (const b of a) yield b;
    else yield a;
  }
};

// yield *을 활용하면 위 코드를 아래와 같이 변경할 수 있다.
// yield *iterable은 for (const val of iterable) yield val; 과 같다.

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

const flatten = pipe(L.flatten, takeAll);

log(flatten([[1, 2], 3, 4, [5, 6, 7]]));
