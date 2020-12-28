// var uname = '';
let uname = 'it';
var it = '黑马';
function Person() {
  this.name = 'Simly';
  this.sayName = function () {
    console.log(this);
    console.log(this.uname); // it
  };
}

let person = new Person();
let sayNameCopy = person.sayName;

// 单独调用
sayNameCopy(); // window undefined
