const C = {};

function noop() {}

const catchNoop = ([...arr]) => (
  arr.forEach((a) => (a instanceof Promise ? a.catch(noop) : a)), arr
);

C.reduce = curry((f, acc, iter) =>
  iter ? reduce(f, acc, catchNoop(iter)) : reduce(f, catchNoop(acc))
);

C.take = curry((l, iter) => take(l, catchNoop(iter)));

C.takeAll = C.take(Infinity);

C.map = curry(pipe(L.map, C.takeAll));

C.filter = curry(pipe(L.filter, C.takeAll));

const delay1000 = (a) =>
  new Promise((resolve) => {
    console.log('hi~');
    setTimeout(() => resolve(a), 1000);
  });
console.time('');
go(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  L.map((a) => delay1000(a * a)),
  L.filter((a) => delay1000(a % 2)),
  L.map((a) => delay1000(a * a)),
  // C.take(2),
  C.reduce(add),
  log,
  (_) => console.timeEnd('')
);

// 병렬처리로 하나의 비동기가 끝나고 다음 비동기가 시작되는게 아니라 한 번에 모든 작업 요청을 보내 처리 가능하다.

// 선언적으로 원하는 목표에 따라 즉시, 지연, 병렬을 선택해서 구현할 수 있다.
