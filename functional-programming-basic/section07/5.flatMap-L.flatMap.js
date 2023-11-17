import { curry, pipe, L, flatten, log, map } from '../utils.js';

L.flatMap = curry(pipe(L.map, L.flatten));

const flatMap = curry(pipe(L.map, flatten));
// const flatMap = curry(pipe(L.flatMap, takeAll)) 도 가능

log(
  flatMap(
    (a) => a,
    [
      [1, 2],
      [3, 4],
      [5, 6, 7],
    ]
  )
);

log(
  flatMap(
    L.range,
    map((a) => a + 1, [1, 2, 3])
  )
);

const company = {
  회사명: '스터디캠프',
  설립일: '2023-05-05',
  기업구성원: {
    인원수: 4,
    명단: ['코치', '초롱이', '마동석', '빡빡이'],
  },
  분야: '통신업',
};

const flattenCompany = (company) => {
  return {
    ...company,
    ...company['기업구성원'],
  };
};

const transformCompany = pipe(flattenCompany, ({ 기업구성원, ...rest }) => {
  return {
    ...rest,
  };
});

log(transformCompany(company));

const newFlatten = (arr) => {
  let result = [];

  for (const a of arr) {
    if (Array.isArray(a)) {
      result = result.concat(flatten(a));
    } else {
      result.push(a);
    }
  }

  return result;
};

log(newFlatten([1, [2, 4]]));
