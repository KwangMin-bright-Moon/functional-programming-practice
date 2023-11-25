import { log } from '../utils';

// const go1 = (a, f) => f(a);

const add5 = (a) => a + 5;

var r = go1(10, add5);
log(r);
// 비동기 상황에서도 동작하는 코드를 만드려면 어떻게 해야할까?

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : a);

const delay100 = (a) =>
  new Promise((resolve) => setTimeout(() => resolve(a), 100));

const n1 = 10;
log(go1(go1(n1, add5), log));

const n2 = delay100(10);
log(go1(go1(n2, add5), log));

// 이렇게 하면 동기, 비동기 상황에 똑같은 모형이 된다.
// 처음 log는 undefined를 반환하지만 두번째 로그는 promise를 반환한다.
// 비동기 상황을 일급 값으로 만들어서 지속적으로 연결해 나갈 수 있는 것이 promise의 특징이다.
