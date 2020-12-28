const arr = [1, 2, 'a', 'b'];

// arr.forEach((item, index, array) => {});

arr.filter((item, index, array) => {
  // [1,2]
  // []
  // 1,2,a,b
  return typeof item === 'number';
  // if (item instanceof Number) {

  // }
});

arr.some((item, index, array) => {
  // 布尔值
  return item === 'a';
});

const obj = {
  age: 42,
};

Object.kes(obj);
