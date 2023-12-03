import * as R from 'ramda';

export class Maybe {
  static just(a) {
    return new Just(a);
  }

  static nothing() {
    return new Nothing();
  }

  static fromNullable(a) {
    return a !== undefined && a !== null ? Maybe.just(a) : Maybe.nothing();
  }

  static of(a) {
    return this.just(a);
  }

  get isNothing() {
    return false;
  }

  get isJust() {
    return false;
  }
}

class Just extends Maybe {
  constructor(value) {
    super();
    this._value = value;
  }

  get value() {
    return this._value;
  }

  map(f) {
    return Maybe.fromNullable(f(this._value));
  }

  getOrElse() {
    return this._value;
  }

  filter(f) {
    return Maybe.fromNullable(f(this._value) ? this._value : null);
  }

  chain(f) {
    return f(this._value);
  }

  toString() {
    return `Maybe.Just(${this._value})`;
  }
}

class Nothing extends Maybe {
  map(f) {
    return this;
  }

  get value() {
    throw new TypeError('Nothing 값을 가져올 수 없습니다.');
  }

  getOrElse(other) {
    return other;
  }

  filter(f) {
    return this._value;
  }

  chain(f) {
    return this;
  }

  toString() {
    return 'Maybe.nothing';
  }
}

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

const find = (db, id) => {
  return db[id];
};

const safeFindObject = R.curry((db, id) => Maybe.fromNullable(find(db, id)));
const safeGetAddress = (ssn) => {
  return ssn.map(R.prop('address'));
};
const safeUpperAddress = (address) => {
  return Maybe.fromNullable(address.getOrElse()).map(toUpper);
};

const toUpper = R.curry((str) => str.toUpperCase());
const findObject = R.curry((db, id) => find(db, id));
const getAddress = (ssn) => ssn['address'];
const studentAddress = R.pipe(findObject(DB['student']), getAddress, toUpper);

// 에러 나는 경우
// const safeStudentAddress = (student) =>
//   student.map(R.prop('school')).map(toUpper).getOrElse('else');

// console.log(R.pipe(safeFindObject(DB['student']), safeStudentAddress)(234234));

const Jason = {
  school: {
    addr: {
      country: 'hello',
    },
  },
};

function getCountry(student) {
  let school = student.school;

  if (school !== null) {
    let addr = school.addr;
    if (addr !== null) {
      return addr.country;
    }
  }
}

getCountry(Jason);
console.log(getCountry(Jason));

const safeFindStudent = safeFindObject(DB['student']);
const safeGetCountry = (student) =>
  student
    .map(R.prop('school'))
    .map(R.prop('address'))
    .map(R.prop('country'))
    .map(toUpper)
    .getOrElse('존재하지 않는 국가입니다!');

console.log(R.pipe(safeFindStudent, safeGetCountry)(234234));

// null이 있을 경우 확실히 방어 할 수 있다.
// 하지만 중간에 typeError 가 발생 할 수 있다. 객체에 toUpperCase등을 적용할 경우 등
// 이렇게 되면 중간에 함수 합성이 끊기게 된다.
