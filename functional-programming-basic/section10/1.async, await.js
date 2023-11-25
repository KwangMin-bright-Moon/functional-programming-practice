// async await이 있어도 promise를 알아야 하는 이유는
// async await은 결국 promise가 있어야 동작하기 때문이다.
// promise를 반환하는 함수가 이미 작성된 라이브러리를 사용할 때는 상관없지만
// 직접 평가시점 등을 다뤄야할 때는 promise를 알야하 다룰 수 있다.

// async 함수의 반환 값은 promise이다. async 함수 내부에서 무언가 동기적으로 처리하는게
// 아니라 async 함수를 다른 곳에서 받아서 처리해야한다면 또한 promise를 다루는 것이다.

function delay(time) {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

async function delayIdentity(a) {
  await delay(500);
  return a;
}

async function f1() {
  const a = await delayIdentity(10);
  const b = await delayIdentity(5);
  return a + b;
}

// const pa = Promise.resolve(10);
const pa = f1();

(async () => {
  log(await pa);
  log(await pa);
  log(await pa);
})();
f1();
f1().then(log);
go(f1(), log);
(async () => {
  log(await f1());
})();
