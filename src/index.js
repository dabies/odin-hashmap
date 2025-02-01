import { HashMap } from "./hashMap";

 const newMap = new HashMap(10, 0.75);
console.log(newMap);
newMap.set('Hello', 'World');
newMap.length();
newMap.has('Hello');