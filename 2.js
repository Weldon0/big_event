let obj = {
  name: 'kunkun',
  age: 18,
  sons: [18, 19, 20],
  girls: {
    name: 'kunkuns',
    age: 20,
  },
};

function deepCopy(newObj, oldObj) {
  for (const key in oldObj) {
    const item = oldObj[key];
    if (Array.isArray(item)) {
      newObj[key] = [];
      deepCopy(newObj[key], item);
    } else if (typeof item === 'object') {
      newObj[key] = {};
      deepCopy(newObj[key], item);
    } else {
      newObj[key] = item;
    }
  }
}

const newObj = {};

deepCopy(newObj, obj);

console.log(newObj);
