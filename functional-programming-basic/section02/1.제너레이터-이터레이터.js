const log = console.log;
/**
 * 제너레이터/이터레이터
 * - 제너레이터: 이터레이터이자 이터러블을 생성하는 함수
 */

// 제너레이터는 이터레이터를 반환한다.
function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 100; // done이 true가 됐을 때 전달 할 값을 return 값으로 할 수 있다. 하지만 순회할 때 return 값은 적용 안된다.
}

let iter = gen();
log(iter[Symbol.iterator]() === iter);
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
// generator를 통해 쉽게 이터레이터를 만들 수 있다.
// 이터레이터이자 이터러블이다.

// yield를 통해 몇번의 next까지 값을 꺼내 줄 지 정할 수 있다.

// 이터러블이기 때문에 순회가 가능하다.
for (const a of gen()) log(a);

// generator는 순회할 값을 문장으로 표현하는 것이라 말할 수 있다.
function* gen1() {
  yield 1;
  if (false) yield 2;
  yield 3;
}

for (const a of gen1()) log(a);

// 자바스크립트에서는 어떠한 값이든 이터러블이면 순회할 수 있다.
// 제너레이터는 문장을 통해 순회할 수 있는 값을 만들 수 있기 때문에
// 자바스크립트에서는 어떤한 값이나 상태든 제너레이터를 통해 순회 할 수 있게 만들 수 있다.
