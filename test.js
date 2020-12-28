const obj = {
  name: '黑马',
  age: 18,
  getUname() {
    console.log(this.name);
    return this;
  },
  getAge() {
    console.log(this.age);
    return this;
  },
  getA() {
    console.log(this);
  },
};

const a = obj.getUname;
a();

// -------------------

getAge();
obj.getAge();

obj.getUname().getAge().getA();
undefined.getAge();
