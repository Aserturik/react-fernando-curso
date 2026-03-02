import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>funciones flecha</h1>
</div>
`;

// const sum = (...numbers) => {
//   console.log("Sumando los números:", numbers);
// };
//
// sum(1, 2, 3, 4, 5);
//
// const test = (a, b, ...others) => {
//   console.log(a);
//   console.log(b);
//   console.log(others);
// };
//
// test(1, 2, 3, 4, 5);
//
// const numbers = [1, 2, 3];
// const newNumbers = [...numbers, 4, 5];
// console.log(newNumbers);
//
// const original = [1, 2, 3];
// const copy = [...original];
//
// copy.push(4);
//
// console.log("Original:", original);
// console.log("Copy:", copy);
//
// // destructuring
// /*
// const user = {
//   name: "Alex",
//   age: 24,
//   city: "Tunja",
// };
// */
// const { name, age } = user;
// console.log(name, age);
//
// const { name: userName, age: userAge } = user;
// console.log(userName, userAge);
//
// // Deconstrucción de funciones
//
// const printUser = ({ name, age }) => {
//   console.log(name);
//   console.log(age);
// };
//
// printUser(user);
//
// const user = {
//   name: "ananconda",
//   address: {
//     city: "Medellin",
//     zip: "12345",
//   },
// };
//
// const {
//   address: { city},
// } = user;
//
// console.log(city);
//
//
// const user = {
//   name: "Alex",
//   age: 24,
// };
//
// const updateUser = {
//   ...user,
//   age: 25,
// };
//
// console.log(updateUser);
//
// // [a, b] = [b, a];
//
// // closure
// const createIdGenerator = (prefix) => {
//   let count = 0;
//
//   return () => {
//     count++;
//     return `${prefix}-${count}`;
//   };
// };
//
// const gen = createIdGenerator("user");
// console.log(gen()); // user-1
// console.log(gen()); // user-2
//
// // scope alcance
// //
// function outer() {
//   let message = "Hola";
//
//   function inner() {
//     console.log(message);
//   }
//   inner();
//}
//
// outer();
//
//
// const person = {
//  name: "Ana",
//  greet: function(){
//    setTimeout(() => {
//    console.log(`Hola, soy ${this.name}`));
//    }
//  }
// }
// const log = console.log;
// //callback
// function greet(name) {
//   log(`Hola, ${name}`);
// }
//
// function procesUser(callback) {
//   const userName = "Alex";
//   callback(userName);
// }
//
// procesUser(greet);
//
// // ahora con funcion flecha
// const greetArrow = (name) => {
//   log(`Hola, ${name}`);
// };
//
// procesUser(greetArrow);
//
// const numbers = [1, 2, 3, 4, 5];
// numbers.forEach((number) => {
//   log(number);
// });
//
// // calback con tiempo (setTimeout)
// setTimeout(() => {
//   log("Esto se muestra después de 2 segundos");
// }, 2000);
//
const log = console.log;
const people = [
  { name: "Alex", city: "Tunja" },
  { name: "Maria", city: "Bogota" },
  { name: "Juan", city: "Medellin" },
];

const byCyty = people.reduce((acc, person) => {
  acc[person.city] ??= [];
  acc[person.city].push(person);
  return acc;
}, {});

log(byCyty);
