import { L, curry, go, log, range } from '../utils.js';

const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});

go(range(100000), take(5), log);
go(L.range(100000), take(5), log);

// 위 두 코드를 보면 왜 늦게 평가하는게 좋은지 알 수 있다.
// L.range를 쓸 경우 100000개의 요소가 있는 배열을 만들지 않고 5번의 순회로 원하는 결과를 얻을 수 있다.
// 하지만 range를 쓸 경우 5개만 필요할지라도 1000000개의 요소가 있는 배열을 만들어야 한다.

// 지연평가
// 게으른 평가란 말이 있지만 영리하다라는 말도 있다.
// 게으르지만 영리하게 제때 평가하는 것(제떄 계산법)
