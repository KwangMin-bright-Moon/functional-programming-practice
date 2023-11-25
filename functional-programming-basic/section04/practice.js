// 1. go 함수를 구현해보세요.

const go = () => {};

// 2. pipe 함수를 구현해보세요. (첫번쨰 인자의 함수는 인자를 두 개 받을 수 있도록)
const pipe = () => {};

// 3. curry 함수를 구현해보세요.
const curry = () => {};

// 4. 아래 코드를 go 함수로 어떻게 더 보기 좋게 만들 수 있을까요?
// log(
//   reduce(
//     add,
//     map(
//       (p) => p.price,
//       filter((p) => p.price >= 20000, products)
//     )
//   )
// );

// 5. 4번에서 go를 활용해 수정한 코드에 curry를 적용해서 더 간단히 해보세요

// 6. 아래 함수의 중복을 제거해보세요.
// go(
//   products,
//   filter((p) => p.price < 20000),
//   map((p) => p.price),
//   reduce(add),
//   log
// );

// go(
//   products,
//   filter((p) => p.price >= 20000),
//   map((p) => p.price),
//   reduce(add),
//   log
// );
