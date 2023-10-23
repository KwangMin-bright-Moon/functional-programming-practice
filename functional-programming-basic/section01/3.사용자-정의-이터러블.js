const log = console.log;

const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? { done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

let iterator = iterable[Symbol.iterator]();

log(iterator.next());

for (const a of iterator) log(a);

// DOM과 관련된 값들도 이터러블/이터레이터 프로토콜을 따르고 있다.
// for (const a of document.querySelectorAll("*")) log(a)
// const all = document.querySelectorAll("*");
// let iter3 = all[Symbol.iterator]();
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
