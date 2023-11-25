import { curry, pipe, L } from '../utils.js';

L.flatMap = curry(pipe(L.map, L.flatten));

const flatMap = curry(pipe(L.map, flatten));
// const flatMap = curry(pipe(L.flatMap, takeAll)) 도 가능

log(
  flatMap(
    (a) => a,
    [
      [1, 2],
      [3, 4],
      [5, 6, 7],
    ]
  )
);

log(
  flatMap(
    L.range,
    map((a) => a + 1, [1, 2, 3])
  )
);
