import { log, filter } from '../utils.js';

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

log(...filter((p) => p < 20000, products));

log(...filter((p) => p.price >= 20000, products));

log(filter((n) => n % 2, [1, 2, 3, 4]));

log(
  filter(
    (n) => n % 2,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })()
  )
);
