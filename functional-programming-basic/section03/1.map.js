import { log, map } from '../utils.js';

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

log(map((p) => p.name, products));
log(map((p) => p.price, products));

// Array의 내장메소드인 map과 어떤 차이가 있을까?
// Array의 내장메소드인 map은 array에만 쓸 수 있다. 구현한 map은 iterable이면 가능하다.

function* gen() {
  yield 2;
  if (false) yield 3;
  yield 4;
}

log(map((a) => a * a, gen()));

const set = new Set([1, 2, 3, 4]);
log(map((a) => a + 1, set));

const m = new Map();
m.set('a', 10);
m.set('b', 20);
log(map(([k, a]) => [k, a * 2], m));
