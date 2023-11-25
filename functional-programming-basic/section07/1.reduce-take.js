import { go, log, map, pipe, reduce } from '../utils.js';

// reduce나 take는 최종적으로 어떤 함수의 결과를 만드는 함수이다.
// map이나 filter는 이터러블을 유지시키는 반면 reduce, take는 값을 꺼내서 결과를 만드는 함수이다.
// map이나 filter는 지연성을 가질 수 있다.
// reduce는 연산을 시작하는 시작점을 알리는 함수이다.

// 함수형 프로그래밍을 생각할 때 A로부터 B라는 값을 만들려고 할 떄
// A를 받아 map, filter를 반복하다가 reduce로 최종적으로 값을 만들어 리턴하겠다. 이런 식으로 사고해볼 수 있다.

// 객체로부터 url의 쿼리 스트링을 만드는 함수를 만들어 보자

// const queryStr = (obj) =>
//   go(
//     obj,
//     Object.entries,
//     map(([k, v]) => `${k}=${v}`),
//     reduce((a, b) => `${a}&${b}`)
//   );
// 아래와 같이 pipe로 바꿀 수 있다.

const queryStr = pipe(
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  reduce((a, b) => `${a}&${b}`)
);

log(queryStr({ limit: 2, offset: 10, type: 'notice' }));
