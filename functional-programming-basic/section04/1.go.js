// log(
//   reduce(
//     add,
//     map(
//       (p) => p.price,
//       filter((p) => p.price >= 20000, products)
//     )
//   )
// );

// 위 코드를 조금 더 읽기 편하게 만들어보자

// 인자들을 하나로 축약해 간다.
const go = (...args) => reduce((a, f) => f(a), args);

go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  log
);

const add = (a, b) => a + b;

go(
  add(0, 1),
  (a) => a + 10,
  (a) => a + 100,
  log
);

// 위 코드를 go로 변경해보자
go(
  products,
  (products) => filter((p) => p.price < 20000, products),
  (products) => map((p) => p.price, products),
  (prices) => reduce((add, prices)),
  log
);
