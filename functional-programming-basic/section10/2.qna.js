// QnA. Array.prototype.map이 있는데 왜 FxJS의 map 함수가 필요한지?

import { map } from '../utils';

// Array.prototype.map는 비동기 제어가 되지 않는다.
function delayI(a) {
  return new Promise((resolve) => setTimeout(() => resolve(a), 100));
}

async function f2() {
  const list = [1, 2, 3, 4];
  const temp = list.map(async (a) => await delayI(a * a)); //[promise, promise, promise, promise] 를 반환
  // log(temp);
  const res = await temp;
  // log(res);
}

f2();

async function f3() {
  const list = [1, 2, 3, 4];
  const temp = map((a) => delayI(a * a), list); // promise<pending>을 반환, 이미 평가될 수 있도록 실행되었다.
  // log(temp);
  const res = await temp;
  // log(res);
}

f3();

function f4() {
  return map((a) => delayI(a * a), [1, 2, 3, 4]);
}

(async () => {
  // log(await f4());
})();

// QnA. 이제 비동기는 async/await로 제어할 수 있는데 왜 파이프라인이 필요한지?
// 둘이 해결하려고 하는 문제 자체가 다르다.
// 파이프라인의 목적은 명령형 프로그래밍이 아닌 안전한 합성을 하기 위한 목적이다.
// async, await의 경우는 then().then() 으로 이어지는 표현식을 문장 형태로 해서 비동기 상황을 동기 상황으로 문장으로 풀어서 사용하고 싶을 때 사용
// 합성을 풀어놓으려고 하는게 목적이다.

function f5(list) {
  return go(
    list,
    L.map((a) => delayI(a * a)),
    L.filter((a) => delayI(a % 2)),
    L.map((a) => delayI(a + 1)),
    C.take(2),
    reduce((a, b) => delayI(a + b))
  );
}

go(f5([1, 2, 3, 4, 5, 6, 7, 8]), (a) => log(a, 'f5'));

async function f6(list) {
  let temp = [];
  for (const a of list) {
    const b = await delayI(a * a);
    if (await delayI(b % 2)) {
      const c = await delayI(b + 1);
      temp.push(c);
      if (temp.length == 2) break;
    }
  }
  let res = temp[0],
    i = 0;
  while (++i < temp.length) {
    res = await delayI(res + temp[i]);
  }
  return res;
}

go(f6([1, 2, 3, 4, 5, 6, 7, 8]), log);

// 위 두 함수는 같은 동작을 하는 함수이지만 보기에 전혀 다르다.
// f5는 명령형 코드를 파이프라인을 이용해 안전하게 합성하는게 목적이다.
// f6은 명령형 코드를 쓰면서 promise의 then 대신 await을 사용하면 비동기 상황을 문장으로 풀어서 해결하기 위해 사용

// QnA. async/await와 파이프라인을 같이 사용하기도 하나요?
async function f52(list) {
  const r1 = await go(
    list,
    L.map((a) => delayI(a * a)),
    L.filter((a) => delayI(a % 2)),
    L.map((a) => delayI(a + 1)),
    C.take(2),
    reduce((a, b) => delayI(a + b))
  );

  const r2 = await go(
    list,
    L.map((a) => delayI(a * a)),
    L.filter((a) => delayI(a % 2)),
    reduce((a, b) => delayI(a + b))
  );

  const r3 = await delayI(r1 + r2);

  return r3 + 10;
}

go(f52([1, 2, 3, 4, 5, 6, 7, 8]), (a) => log(a, 'f52'));
// 같이 사용 가능하다. 비동기 상황을 문장으로 표현해서 더 쉽게 비동기 문제를 해결 할 수 있다.

// QnA. 동기 상황에서 에러 핸들링은 어떻게 해야하는지?
// try catch를 이용해 에러 핸들링을 할 수 있다. 기본값을 주거나 error에 따라 다르게 대웅해 줄 수 있다.
function f7(list) {
  try {
    return list
      .map((a) => JSON.parse(a))
      .filter((a) => a % 2)
      .slice(0, 2);
  } catch (e) {
    log(e);
    return [];
  }
}
log(f7(['0', '1', '2', '{']));

// QnA. 동기/비동기 에러 핸들링에서의 파이프라인의 이점은?

async function f8(list) {
  try {
    return await list
      .map(
        async (a) =>
          await new Promise((resolve) => {
            resolve(JSON.parse(a));
          })
      )
      .filter((a) => a % 2)
      .slice(0, 2);
  } catch (e) {
    // log(e, '----------------------');
    return [];
  }
}
f8(['0', '1', '2', '{'])
  .then(log)
  .catch((e) => {
    log('에러 핸들링 하겠다.');
  });

//f8의 경우 에러 처리를 제대로 해내지 못한다. catch에 걸리지 않는다.
// catch에 걸리기 위해서는 try의 return에서 Promise.reject를 리턴해야 하는데
// Array.prototype.map은 비동기 처리에 최적화 돼 있지 않기 때문에 처리된 promise를 반환하지 않는다.

async function f9(list) {
  try {
    return await go(
      list,
      map(
        (a) =>
          new Promise((resolve) => {
            resolve(JSON.parse(a));
          })
      ),
      filter((a) => a % 2),
      take(2)
    );
  } catch (e) {
    return [];
  }
}

f9(['0', '1', '2', '3', '4', '{'])
  .then((a) => log(a, 'f9'))
  .catch((e) => {
    log('에러 핸들링 하겠다.', e);
  });

// f9의 경우는 에러가 날 경우 Promise.reject를 반환하기 때문에 catch에 걸릴 수 있다.
// 파이프라인을 이용하면 에러 핸들링을 원하는 대로 쉽게 할 수 있다.
