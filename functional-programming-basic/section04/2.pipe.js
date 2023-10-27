// pipe는 합성된 함수를 만든다.

import { log } from '../utils';

// const pipe =(...fs) => (a) => go(a, ...fs)

// 여기서 사용할 때 인자를 두 개 넣을 수 있게 하려면?

const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

const f = pipe(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100
);

log(f(0, 1));
