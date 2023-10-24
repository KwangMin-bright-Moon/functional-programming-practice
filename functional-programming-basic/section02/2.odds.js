const log = console.log;

// function* odds(l) {
//   for (let i = 0; i < l; i++) {
//     if (i % 2) yield i;
//   }
// }

// const iter = odds(3);

// log(iter.next());
// log(iter.next());

function* infinity(i = 0) {
  while (true) yield i++;
}
// iterator의 next를 평가할 때 까지만 동작하기 때문에 무한루프에 빠지지 않는다.

let iter = infinity();
log(iter.next());
log(iter.next());
log(iter.next());

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a === l) return;
  }
}

const iter2 = limit(4, [1, 2, 3, 4, 5]);
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());

function* odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

const iter3 = odds(10);
log(iter3.next());
log(iter3.next());
log(iter3.next());
log(iter3.next());
log(iter3.next());
log(iter3.next());

// for of, 전개 연산자, 구조 분해, 나머지 연산자
for (const a of odds(5)) log(a);

log(...odds(10));
log([...odds(10), ...odds(20)]);

const [head, ...tails] = odds(9);
log(head);
log(tails);

const [a, b, ...rest] = odds(10);
log(a);
log(b);
log(rest);
