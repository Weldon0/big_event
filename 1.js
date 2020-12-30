function fn() {
  let num = 0; // 1 2

  return function () {
    num++;
    console.log(num);
  };
}

const num1 = 1;
// 关闭浏览器时候回首
// 辣鸡会收机制

let fn1 = fn();
fn1(); // 1
fn1(); // 2
fn1(); // 3
fn1(); // 4
fn1(); // 5
fn1(); // 6

let fn2 = fn();
fn2(); // 7
fn2(); //
fn2(); //
fn2(); //
fn2();

fn1(); // 7
