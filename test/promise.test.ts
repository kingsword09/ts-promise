/// <reference lib="dom" />
import Promise from "../src/promise";

function add() {
  return new Promise<string>((resolve, reject) => {
    let a = "Hello",
      b = " World",
      c = "!!!";
    // resolve(a + b + c);
    reject();
  });
}

let result = add();
console.log(result);
console.log(
  result
    .then(
      (value) => {
        console.log("value");
        console.log(value);

        return new Promise<string>((resolve) => {
          resolve("haha");
        });
      },
      (err) => {
        console.log("err");
        console.log(err);
      }
    )
    ?.then((value) => {
      console.log(value);
    })
);
