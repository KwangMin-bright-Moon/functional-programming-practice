import { L, curry, go, log, take } from '../utils.js';

const users = [
  { age: 32 },
  { age: 31 },
  { age: 34 },
  { age: 36 },
  { age: 37 },
  { age: 32 },
  { age: 23 },
  { age: 38 },
];

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

log(find((u) => u.age < 33)(users));

// 참고
// 쉼표 연산자
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Comma_Operator
// 쉼표 연산자는 각각의 피연산자를 왼쪽에서 오른쪽 순서로 평가하고, 마지막 연산자의 값을 반환합니다.
const obj = { a: 1 };
const modi = (obj) => ((obj.a = 2), obj);
log(modi(obj)); // {a: 2}

const a = (1, 2, 3);
log(a); // 3
