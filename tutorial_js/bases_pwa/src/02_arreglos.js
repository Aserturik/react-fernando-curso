import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Arreglos </h1>
</div>
`;

let frutas = ["manzana", "banana", "naranja"];

// operacion length
console.log("Cantidad de frutas ", frutas.length);

console.log(frutas[0]);
console.log(frutas[1]);
console.log(frutas[2]);

// arreglo de numeros
let edades = [10, 20, 30, 40];
// operacion push agregar un elemento al final del arreglo
edades.push(50);
console.log(edades);
// arreglo de booleanos
let estados = [true, false, true];
// pop eliminar el ultimo elemento del arreglo
estados.pop();
console.log(estados);

// Mezclar tipos
let datos = ["manzana"];
// unshift agregar un elemento al inicio del arreglo
datos.unshift(10);
console.log(datos);

// nombre, ciudad, lista de equipos de futbol, lista de cantantes (a uno de los cantantes una lista de canciones)

let futbol_equipo = ["Boca", "River", "Racing"];
// shift eliminar el primer elemento del arreglo
futbol_equipo.shift();
console.log(futbol_equipo);

let cantantes = [
  { nombre: "Shakira", canciones: ["waka waka", "saminamina"] },
  { nombre: "Vicente", canciones: [] },
];
// toString convertir un arreglo a una cadena de texto
console.log("Cnatantes", cantantes.toString());

let super_arreglo = ["Leon", "Buenos Aires", futbol_equipo, cantantes];
// forEach recorrer un arreglo
console.log("Recorrido con forEach");
super_arreglo.forEach((elemento) => {
  console.log(elemento);
});

// map crear un nuevo arreglo a partir de otro arreglo
let numeros = [1, 2, 3, 4, 5];
let dobles = numeros.map((numero) => numero * 2);
console.log("Numeros ", numeros);

// 9 filter crear un nuevo arreglo con los elementos que cumplan una condicion

let Edades = [15, 20, 25, 30, 35];
let mayores = Edades.filter((edad) => edad >= 18);
console.log("mayores ", mayores);

// includes verificar si un elemento existe en un arreglo
console.log("edades incluye 20 ", Edades.includes(20));

// find encontrar el primer elemento que cumpla una condicion
let encontrado = Edades.find((edad) => edad > 25);
console.log("primer maoyor a 25 ", encontrado);

// join unir los elementos de un arreglo en una cadena de texto
let texto = Edades.join(", ");
console.log("unido con join ", texto);

// slice copiar una parte de un arreglo
let copiafrutas = frutas.slice(0, 2);
console.log("copia de frutas ", copiafrutas);

// splice eliminar elementos de un arreglo
let frutasEliminadas = frutas.splice(1, 1);
console.log("frutas eliminadas ", frutasEliminadas);

// splice mas reemplazar elementos de un arreglo
let frutasReemplazadas = frutas.splice(1, 1, "pera", "kiwi");
console.log("frutas reemplazadas ", frutasReemplazadas);

// indexOf encontrar el indice de un elemento en un arreglo
let indice = frutas.indexOf("pera");
console.log("indice de pera ", indice);
