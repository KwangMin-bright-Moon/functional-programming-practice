import * as R from 'ramda';

class Wrapper {
  constructor(value) {
    this._value = value;
  }

  map(f) {
    return f(this._value);
  }

  fmap(f) {
    return new Wrapper(f(this._value));
  }

  toString() {
    return `Wrapper (${+this._value + ''})`;
  }
}

class Empty {
  map(f) {
    return this;
  }

  fmap(_) {
    return new Empty();
  }

  toString() {
    return 'Empty ()';
  }
}

const wrap = (val) => new Wrapper(val);
const empty = () => new Empty();

const wrappedValue = wrap('Get Funtional');
const value = wrappedValue.map(R.identity);
console.log(value);
const wrappedNull = wrap(null);
const value2 = wrappedNull.map(R.identity);
console.log(value2);

const plus = R.curry((a, b) => a + b);
const plus3 = plus(3);
const plus10 = plus(10);
const two = wrap(2);

const five = two.fmap(plus3);
console.log(five);
console.log(five.map(R.identity));

const fifteen = two.fmap(plus3).fmap((a) => a + 10);
console.log(fifteen.map(R.identity));

const isEven = (n) => Number.isFinite(n) && n % 2 === 0;
const half = (val) => (isEven(val) ? wrap(val / 2) : empty());

console.log(half(4).fmap(plus3).map(R.identity));
console.log(half(5).fmap(plus3).fmap(plus10).map(R.identity)); // Empty

const normalHalf = (val) => (isEven(val) ? val / 2 : null); // 만약 일반적인 함수를 썼다면 인자를 받는 곳에서 null check를 해줘야 한다.
console.log(R.pipe(normalHalf, plus3, plus10)(8)); //

// Wrapper 모나드
class WrapperMonad {
  constructor(value) {
    this._value = value;
  }

  static of(a) {
    return new Wrapper(a);
  }

  map(f) {
    return Wrapper.of(f(this._value));
  }

  join() {
    if (!(this._value instanceof Wrapper)) {
      return this;
    }
    return this._value.join();
  }

  get() {
    return this._value;
  }

  toString() {
    return `Wrapper (${this._value})`;
  }
}

const userData = {
  student: {
    234234: {
      address: 'student address',
    },
  },
  employee: {
    234234: {
      address: 'employee address',
    },
  },
};

const find = (db, id) => {
  if (!db[id]) {
    throw new Error('없습니다.');
  }
  return db[id];
};

const findObject = R.curry((db, id) => WrapperMonad.of(find(db, id)));

const getAddress = (student) => WrapperMonad.of(student.map(R.prop('address')));

const studentAddress = R.pipe(findObject(userData['student']), getAddress);

console.log(studentAddress(234234));
