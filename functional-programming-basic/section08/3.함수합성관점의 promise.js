// 함수 합성이라고 하면
// f g 각각의 함수가 있을 때 x라는 인자를 인자를 전달 받을 때
// g 함수를 실행하고 그 결과를 그대로 f에게 전달하는 것과 같은 일을 하는 것이다.
// f(g(x))

// 모나드는 함수 합성을 안전하게 하기 위한 도구이다.

const g = (a) => a + 1;
const f = (a) => a * a;

// log(f(g(1)));
// log(f(g())); NaN 반환

Array.of(1).map(g).map(f) /*.forEach(r => log(r))*/;
[].map(g).map(f) /*.forEach(r => log(r))*/; // 박스에 제대로 된 값이 들어 오지 않으면 실행되지 않는다.

Promise.resolve(2).then(g).then(f) /*.then(r => log(r))*/;
new Promise((resolve) => setTimeout(() => resolve(2), 100))
  .then(g)
  .then(f) /*.then(r => log(r))*/;
// 프로미스는 비동기적으로 일어난 상황을 안전하게 합성하기 위한 도구이다.
