//  range
let add = (a, b) => a + b;

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

let list1 = range(4);
log(list1);
log(reduce(add, list1));

// 느긋한 range
const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

let list2 = L.range(4);
log(list2);
log(reduce(add, list2));

// 위 코드에서 그냥 range의 경우
// list1에 range(4)를 했을 때 즉시 배열이 만들어진다. 즉시 평가가 된다.
// L.range의 경우 이터레이터의 내부를 순회할 때 마다 하나씩 값이 평가 된다.
// 실제로 필요할 때 값이 평가되기 때문에 자원을 조금이라도 아낄 수 있는 장점이 있다. 그냥 range로 한 list1의 경우
// 만든 시점에서는 아직 쓸지 안쓸지 모르지만 먼저 평가가 된다.

function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

test('range', 10, () => reduce(add, range(1000000)));
test('L.range', 10, () => reduce(add, L.range(1000000)));
