// const queryStr = pipe(
//     Object.entries,
//     map(([k, v]) => `${k}=${v}`),
//     reduce((a, b) => `${a}&${b}`)
//   );

import { L, curry, log, map, pipe, reduce } from '../utils.js';

//   log(queryStr({ limit: 2, offset: 10, type: 'notice' }));

// 앞에서 만든 함수에 join함수를 만들어 수정해보자
// 만든 join함수는 Array.prototype.join 보다 다형성이 높다.
// Array.prototype.join은 배열만 사용가능하지만 만든 join 함수는
// 이터러블이면 사용 가능하다. 지연 평가를 활용할 수도 있다.

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

const join = curry((sep = ',', iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter)
);

const queryStr = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join('&')
);

log(queryStr({ limit: 2, offset: 10, type: 'notice' }));

function* a() {
  yield 10;
  yield 11;
  yield 12;
  yield 13;
}

log(join(' - ', a()));
