// for of 의 내부
iter = iter[Symbol.iterator]();
let cur;
while (!(cur = iter.next()).done) {
  const a = cur.value;
}

go(
  range(100000),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(10),
  log
);

go(
  L.range(Infinity),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  take(10),
  log
);

// 지연평가된 아래의 go 함수의 실행 순서는 평소 생각하는 실행 순서로 실행되지 않는다.
// 지연된 상태로 take까지 가고 iter가 실행될 때 filter, map, range로 거슬러 올라가고 range에서 yield가
// 될 때 다시 밑으로 내려간다.
// range에서 무한수열이 와도 10개만 평가된다

// map, filter 계열 함수들이 가지는 결합 법칙

// - 사용하는 데이터가 무엇이든지
// - 사용하는 보조 함수가 순수 함수라면 무엇이든지
// - 아래와 같이 결합한다면 둘 다 결과가 같다.

// [[mapping, mapping], [filtering, filtering], [mapping, mapping]]
// =
// [[mapping, filtering, mapping], [mapping, filtering, mapping]]
