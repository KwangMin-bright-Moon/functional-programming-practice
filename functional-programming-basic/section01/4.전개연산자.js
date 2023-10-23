const log = console.log;

const a = [1, 2];
// a[Symbol.iterator] = null;
const arr = [1, 2, 3, 4];
const set = new Set([1, 2, 3]);
const map = new Map([
  ["a", 1],
  ["b", 2],
]);

log([...a, ...arr, ...set, ...map.values()]);
