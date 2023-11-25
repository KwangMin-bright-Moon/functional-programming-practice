import { L, log, reduce, take } from '../utils';

go(
  [1, 2, 3],
  L.map((a) => Promise.resolve(a + 10)),
  take(2),
  log
);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => a + 10),
  take(2),
  log
);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => Promise.resolve(a + 10)),
  take(2),
  log
);

go(
  [1, 2, 3],
  map((a) => Promise.resolve(a + 10)),
  log
);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  map((a) => a + 10),
  log
);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  map((a) => Promise.resolve(a + 10)),
  log
);

go(
  [1, 2, 3, 4, 5],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => Promise.resolve(a % 2)),
  reduce(add),
  log
);

go(
  [1, 2, 3, 4, 5, 6, 7, 8],
  L.map((a) => {
    log(a);
    return new Promise((resolve) => setTimeout(() => resolve(a * a), 1000));
  }),
  L.filter((a) => {
    log(a);
    return new Promise((resolve) => setTimeout(() => resolve(a % 2), 1000));
  }),
  take(2),
  reduce(add),
  log
);

// 지연 평가로 꼭 필요한 거에 대해서만 비동기 작업을 할 수 있다.
