//1
const task1 = new Promise((resolve) => {
  setTimeout(() => resolve("Task 1 complete"), 2000);
});
task1.then((message) => console.log(message));

//2
const task2 = new Promise((_, reject) => {
  reject(new Error("Task 2 failed"));
});
task2.catch((error) => console.error(error.message));

//3
const task3 = new Promise((resolve) => resolve(5));
task3
  .then((num) => num * 2)
  .then((doubled) => console.log(doubled));

//4
const task4 = () => new Promise((resolve) => setTimeout(() => resolve("First"), 2000));
task4().then((message) => {
  console.log(message);
  return new Promise((resolve) => setTimeout(() => resolve("Second"), 1000));
}).then((message) => console.log(message));

//5
const task5 = () => new Promise((_, reject) => setTimeout(() => reject(new Error("Task 3 failed")), 2000));
task5().catch((error) => console.error(error.message));

//6
const randomDelay = () => Math.floor(Math.random() * 4000) + 1000;
const task6 = () => new Promise((resolve) => setTimeout(() => resolve("Task 1 complete"), randomDelay()));
task6().then((message) => console.log(message));

//7
const task7 = () => new Promise((resolve) => setTimeout(() => resolve("First"), randomDelay()));
task7().then((message) => {
  console.log(message);
  return new Promise((resolve) => setTimeout(() => resolve("Second"), randomDelay()));
}).then((message) => console.log(message));

//8
const task8 = () => new Promise((_, reject) => setTimeout(() => reject(new Error("Task 3 failed")), randomDelay()));
task8().catch((error) => console.error(error.message));

//9
const task9 = () => new Promise((resolve) => {
  const isQuick = Math.random() <= 0.5;
  setTimeout(() => resolve(isQuick ? "Task 1 was quick" : "Task 1 complete"), randomDelay());
});
task9().then((message) => console.log(message));

//10
const task10 = () => new Promise((resolve, reject) => {
  if (Math.random() < 0.3) {
    setTimeout(() => reject(new Error("Task 3 failed")), randomDelay());
  } else {
    setTimeout(() => resolve("Task 3 complete"), randomDelay());
  }
});
task10().then((message) => console.log(message)).catch((error) => console.error(error.message));

//11
const promise11a = new Promise((resolve) => setTimeout(() => resolve("Promise 1"), 1000));
const promise11b = new Promise((resolve) => setTimeout(() => resolve("Promise 2"), 2000));
const promise11c = new Promise((resolve) => setTimeout(() => resolve("Promise 3"), 3000));
Promise.all([promise11a, promise11b, promise11c]).then((messages) => console.log(messages));

//12
const promise12a = new Promise((resolve) => setTimeout(() => resolve("Promise 4"), randomDelay()));
const promise12b = new Promise((resolve) => setTimeout(() => resolve("Promise 5"), randomDelay()));
const promise12c = new Promise((resolve) => setTimeout(() => resolve("Promise 6"), randomDelay()));
Promise.all([promise12a, promise12b, promise12c]).then((messages) => console.log(messages));

//13
const promise13a = new Promise((resolve) => setTimeout(() => resolve("Promise 7"), 1000));
const promise13b = new Promise((_, reject) => setTimeout(() => reject(new Error("Promise failed")), 2000));
const promise13c = new Promise((resolve) => setTimeout(() => resolve("Promise 9"), 3000));
Promise.all([promise13a, promise13b, promise13c]).then((messages) => console.log(messages)).catch((error) => console.error(error.message));

//14
const randomConditionPromise = (message) => new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve(message);
  } else {
    reject(new Error(`${message} failed`));
  }
});
const promise14a = randomConditionPromise("Promise 10");
const promise14b = randomConditionPromise("Promise 11");
const promise14c = randomConditionPromise("Promise 12");
Promise.all([promise14a, promise14b, promise14c]).then((messages) => console.log(messages)).catch((error) => console.error(error.message));

//15
const promise15a = new Promise((resolve) => setTimeout(() => resolve(1), randomDelay()));
const promise15b = new Promise((resolve) => setTimeout(() => resolve(2), randomDelay()));
const promise15c = new Promise((resolve) => setTimeout(() => resolve(3), randomDelay()));
Promise.all([promise15a, promise15b, promise15c]).then((numbers) => {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  console.log(sum);
});

//16
const promise16a = new Promise((resolve) => setTimeout(() => resolve("Promise 13"), 1000));
const promise16b = new Promise((resolve) => setTimeout(() => resolve("Promise 14"), 2000));
const promise16c = new Promise((resolve) => setTimeout(() => resolve("Promise 15"), 3000));
Promise.race([promise16a, promise16b, promise16c]).then((message) => console.log(message));

//17
const promise17a = new Promise((resolve) => setTimeout(() => resolve("Promise 16"), randomDelay()));
const promise17b = new Promise((resolve) => setTimeout(() => resolve("Promise 17"), randomDelay()));
const promise17c = new Promise((resolve) => setTimeout(() => resolve("Promise 18"), randomDelay()));
Promise.race([promise17a, promise17b, promise17c]).then((message) => console.log(message));

//18
const promise18a = new Promise((resolve) => setTimeout(() => resolve("Promise 19"), 2000));
const promise18b = new Promise((resolve) => setTimeout(() => resolve("Promise 20"), 3000));
const instantPromise = Promise.resolve("Instant Promise");
Promise.race([promise18a, promise18b, instantPromise]).then((message) => console.log(message));

// 19
const promise19a = new Promise((resolve) => setTimeout(() => resolve("Promise 21"), 3000));
const promise19b = new Promise((_, reject) => setTimeout(() => reject(new Error("Promise failed")), 2000));
const promise19c = new Promise((resolve) => setTimeout(() => resolve("Promise 22"), 5000));
Promise.race([promise19a, promise19b, promise19c])
  .then((message) => console.log(message))
  .catch((error) => console.error(error.message));

//20
const randomConditionPromise2 = (message, delayMessage) => new Promise((resolve) => {
  const isSuccess = Math.random() > 0.5;
  setTimeout(() => resolve(isSuccess ? message : delayMessage), randomDelay());
});
const promise20a = randomConditionPromise2("Immediate Promise 23", "Delayed Promise 23");
const promise20b = randomConditionPromise2("Immediate Promise 24", "Delayed Promise 24");
const promise20c = randomConditionPromise2("Immediate Promise 25", "Delayed Promise 25");
Promise.race([promise20a, promise20b, promise20c]).then((message) => console.log(message));

//21
fetch('')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
