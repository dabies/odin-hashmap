import { HashMap } from "./hashMap";

//creating a test hashmap and adding pairs to it to see if it expands on its own (it does)
let test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('hello', 'world');

//testing functionality
console.log(test);
console.log(`Initial length: ${test.length()}`);
console.log(`Remove hello?: ${test.remove('hello')}`);
console.log(`Length after removing hello: ${test.length()}`);
console.log(`Get value of key grape: ${test.get('grape')}`);
console.log(`Has kite?: ${test.has('kite')}`);
console.log(`Has melon?: ${test.has('melon')}`);
console.log(`Array of keys: ${test.keys()}`);
console.log(`Array of values: ${test.values()}`);
console.log(`Array of key value pairs: ${test.entries()}`);
test.clear()
console.log(`After clearing, does it reset?`);
console.log(test);