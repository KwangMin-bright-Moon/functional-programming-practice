// 파이프라인으로 코드를 조합해서 중복을 제거 할 수 있다.

const total_price = pipe(
  map((p) => p.price),
  reduce(add)
);

const base_total_price = (predi) => pipe(filter(predi), total_price);

go(
  products,
  base_total_price((p) => p.price < 20000),
  log
);

go(
  products,
  base_total_price((p) => p.price >= 20000),
  log
);

// 고차함수들을 함수의 조합으로 만들어가면서 중복을 제거할 수 있다.
