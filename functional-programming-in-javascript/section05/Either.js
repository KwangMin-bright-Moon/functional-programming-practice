import * as R from 'ramda';

export class Either {
  constructor(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  static left(a) {
    return new Left(a);
  }

  static right(a) {
    return new Right(a);
  }

  static fromNullable(val) {
    return val !== null && val !== undefined
      ? Either.right(val)
      : Either.left(val);
  }

  static of(a) {
    return Either.right(a);
  }
}

class Left extends Either {
  map(_) {
    return this;
  }

  get value() {
    throw new TypeError('Left(a) 값을 가져올 수 없습니다.');
  }

  getOrElse(other) {
    return other;
  }

  orElse(f) {
    return f(this._value);
  }

  chain(f) {
    return this;
  }

  getOrElseThrow(a) {
    throw new Error(a);
  }

  filter(f) {
    return this;
  }

  toString() {
    return `Either.Left(${this._value})`;
  }
}

class Right extends Either {
  map(f) {
    return Either.of(f(this._value));
  }

  getOrElse(otehr) {
    return this._value;
  }

  orElse() {
    return this;
  }

  chain(f) {
    return f(this._value);
  }

  getOrElseThrow(_) {
    return this._value;
  }

  filter(f) {
    return Either.fromNullable(f(this._value)) ? this._value : null;
  }

  toString() {
    return `Either.Right(${this._value})`;
  }
}

const find = (db, id) => {
  return db[id];
};

const safeFindObject = R.curry((db, id) => {
  const obj = Either.fromNullable(find(db, id));
  return obj;
});

const DB = {
  student: {
    234234: {
      school: {
        address: {
          country: 'afd',
        },
      },
    },
  },
  employee: {
    234234: {
      address: 'employee address',
    },
  },
};

const safeFindStudent = safeFindObject(DB['student']);
const toUpper = R.curry((str) => {
  if (typeof str !== 'string') {
    return Either.left('str 형식이 아닙니다.');
  }
  return Either.of(str.toUpperCase());
});
const result = safeFindStudent(234234)
  .map(R.prop('school'))
  .map(R.prop('address'))
  .getOrElse();

const findObject = R.curry((db, id) => {
  const obj = find(db, id);

  if (!obj) {
    throw new Error('찾는 대상이 없습니다.');
  }

  return obj;
});

const findStudent = findObject(DB['student']);

const safeGetCountry = (id) =>
  safeFindStudent(id)
    .map(R.prop('school'))
    .map(R.prop('address'))
    .map(R.prop('country'))
    .chain(toUpper)
    .getOrElse('id에 해당하는 country가 없습니다!');

const logCountry = R.pipe(safeGetCountry, console.log);

const getCountry = (id) => {
  try {
    return R.pipe(
      findStudent,
      R.prop('school'),
      R.prop('address'),
      console.log
    )(id);
  } catch (error) {
    console.log(error.message);
  }
};

getCountry(234234);
logCountry(234234);
