import { curry, filter, go, log, map, pipe, reduce } from './utils.js';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let result = [];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    result.push(numbers[i] * 4);
  }
}
result = result.slice(0, 2);

console.log(result);

//---------------------------------------------
// 출력값
// [8, 16]
// log(
//   go(
//     numbers,
//     filter((num) => num % 2 === 0),
//     map((num) => num * 4),
//     take(2)
//   )
// );

const scores = [
  { name: '초롱이', 국어: 60, 수학: 63, 영어: 87 },
  { name: '빡빡이', 국어: 40, 수학: 72, 영어: 82 },
  { name: '마동석', 국어: 70, 수학: 38, 영어: 41 },
  { name: '리키', 국어: 90, 수학: 96, 영어: 56 },
  { name: '백바지', 국어: 85, 수학: 53, 영어: 78 },
];

const average = (scores) =>
  pipe(
    reduce((a, b) => a + b),
    (sum) => sum / scores.length
  );

const averageOfEnglish = (scores) =>
  go(
    scores,
    map((score) => score.영어),
    average(scores)
  );

log(averageOfEnglish(scores));

// const averageOfSubject = (subject) =>
//   pipe(
//     map((student) => student[subject]),
//     reduce((a, b) => a + b),
//     (sum) => sum / students.length
//   );

// log(averageOfSubject('영어')(students));

const addSubjects = (score, subjects) =>
  go(
    subjects,
    map((s) => score[s]),
    average(subjects)
  );

const averageOfStudents = (...subjects) =>
  go(
    scores,
    map((score) => ({
      name: score.name,
      평균: addSubjects(score, subjects),
    }))
  );

log(averageOfStudents('영어', '국어', '수학'));

/**
	@param {Array<T>} arr
  @param {(t: T) => number} cond
	@return { key: Array<T>, key2: Array<T> }
*/
const groupBy = (arr, cond) => {
  // 구현해 주세요.
};

//---------------------------------------------
// 사용법 예시
groupBy(['one', 'two', 'three'], (s) => s.length);

// 결과값
// => { '3': ['one', 'two'], '5': ['three'] }
