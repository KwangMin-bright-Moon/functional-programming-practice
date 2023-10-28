import { curry, go, log, map, pipe, reduce } from '../utils.js';

const products = [
  { name: '반팔티', price: 15000, quantity: 1 },
  { name: '긴팔티', price: 20000, quantity: 2 },
  { name: '핸드폰케이스', price: 15000, quantity: 3 },
  { name: '후드티', price: 30000, quantity: 4 },
  { name: '바지', price: 25000, quantity: 5 },
];

// 총 수량을 구해보자

// const total_quantity = (products) =>
//   go(
//     products,
//     map((p) => p.quantity),
//     reduce((a, b) => a + b)
//   );
// 위의 코드는 아래 처럼 pipe로 쓸 수 있다.

const add = (a, b) => a + b;

const total_quantity = pipe(
  map((p) => p.quantity),
  reduce(add)
);

log(total_quantity(products));

const total_price = pipe(
  map((p) => p.price * p.quantity),
  reduce(add)
);

log(total_price(products));

// 위 두 코드들의 중복된 부분들을 가져와 더 추상화된 코드를 만들어보자

const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

log(sum((p) => p.quantity)(products));

// 위 두 코드를 sum을 이용해 변경해보자

// const total_quantity = sum(p => p.quantity)

// const total_price = sum(p => p.price * p.quantity)

log(sum((u) => u.age, [{ age: 30 }, { age: 20 }]));
