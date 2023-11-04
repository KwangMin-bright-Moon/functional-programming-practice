const users = [
  {
    name: 'a',
    age: 21,
    family: [
      { name: 'a1', age: 53 },
      { name: 'a2', age: 47 },
      { name: 'a3', age: 16 },
      { name: 'a4', age: 15 },
    ],
  },
  {
    name: 'b',
    age: 24,
    family: [
      { name: 'b1', age: 58 },
      { name: 'b2', age: 51 },
      { name: 'b3', age: 19 },
      { name: 'b4', age: 22 },
    ],
  },
  {
    name: 'c',
    age: 31,
    family: [
      { name: 'c1', age: 64 },
      { name: 'c2', age: 62 },
    ],
  },
  {
    name: 'd',
    age: 20,
    family: [
      { name: 'd1', age: 42 },
      { name: 'd2', age: 42 },
      { name: 'd3', age: 11 },
      { name: 'd4', age: 7 },
    ],
  },
];

go(
  users,
  L.flatMap((u) => u.family),
  L.filter((u) => u.age > 20),
  L.map((u) => u.age),
  take(4),
  reduce(add),
  log
);

// 함수형 프로그래밍은 데이터를 어떻게 구성할지를 먼저 만들어 내고
// 프로그래밍을 하는 것이 아니라 조합돼 있는 함수에 맞는 데이터를 구성하는 식으로 작성하는 것

// 객체지향프로그래밍은 데이터를 먼저 정리를 하고 메소드를 그 이후에 만들면서 작성한다면
// 함수형프로그래밍은 만들어진 함수 조합이 있다면 그 함수 조합에 맞는 데이터를 구성하는 식으로
// 함수를 우선순위에 두고 작성한다.
