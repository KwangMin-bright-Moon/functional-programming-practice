const log = console.log;

log("Arr -----------");
const arr = [1, 2, 3];
for (const a of arr) log(a);

log("Set -----------");
const set = new Set([1, 2, 3]);
for (const a of set) log(a);

log("Map -----------");
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
for (const a of map) log(a);
for (const a of map.keys()) log(a);
for (const a of map.values()) log(a);
for (const a of map.entries()) log(a);

let it = map.keys();
log(it);
log(it.next());
log(it[Symbol.iterator]);
let it2 = it[Symbol.iterator]();
log(it2.next());
log(it2.next());
log(it2.next());

/**
 * 이터러블/이터레이터 프로토콜
 * - 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값
 * - 이터레이터: {value, done} 객체를 리턴하는 next()를 가진 값([Symbol.iterator]메서드도 가지고 있다. 자기 자신을 리턴한다)
 * - 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약
 */

log(arr[Symbol.iterator]);
let iterator = arr[Symbol.iterator]();
log(iterator);
log(iterator.next());
log(iterator.next());
log(iterator.next());
log(iterator.next());
