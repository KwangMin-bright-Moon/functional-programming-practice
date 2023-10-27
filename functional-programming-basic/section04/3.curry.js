// curry는 값을 함수로 다루면서 받아둔 함수를 내가 원하는 시점에 평가시는 함수

import { log } from '../utils';

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const mult = curry((a, b) => a * b);
log(mult(3)(2));

const mult3 = mult(3);
log(mult3(10));
log(mult3(5));
log(mult3(3));

// go(
//     products,
//     (products) => filter((p) => p.price < 20000, products),
//     (products) => map((p) => p.price, products),
//     (prices) => reduce((add, prices)),
//     log
//   );

// curry를 이용하면 위 코드를 더 간단하게 만들 수 있다.
// filter, map, reduce에 curry를 적용해보자. 그럼 두 번째 인자를 나중에 전달해도 되고 그때 평가된다.

go(
  products,
  filter((p) => p.price < 20000),
  map((p) => p.price),
  reduce(add),
  log
);
