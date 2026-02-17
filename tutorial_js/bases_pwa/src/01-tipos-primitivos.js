import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Tipos de datos primitivos en JavaScript</h1>
  </div>
`;

let nombre = "Leo";
let mensaje = "Bienvenido a la cripta puto";

console.log("nombre ", nombre, "tipo de dato ", typeof nombre);
console.log("mensaje ", mensaje, "tipo de dato ", typeof mensaje);

let edad = 30;
let precio = 19.99;

console.log("Edad ", edad, "tipo de dato ", typeof edad);
console.log("Precio ", precio, "tipo de dato ", typeof precio);

// Boolean

let estudiante = true;
let tieneDescuento = false;

console.log("Estudiante ", estudiante, "tipo de dato ", typeof estudiante);
console.log(
  "Tiene descuento ",
  tieneDescuento,
  "tipo de dato ",
  typeof tieneDescuento,
);

// 4. null

let valorNulo = null;
console.log("Valor nulo ", valorNulo, "tipo de dato ", typeof valorNulo);

// 5. Undefined
let valorIndefinido;

console.log(
  "Valor indefinido ",
  valorIndefinido,
  "tipo de dato ",
  typeof valorIndefinido,
);

// 6. symbol

let simbolo1 = Symbol("simbolo1");
let simbolo2 = Symbol("simbolo2");

console.log("Simbolo 1 ", simbolo1, "tipo de dato ", typeof simbolo1);
console.log("Simbolo 2 ", simbolo2, "tipo de dato ", typeof simbolo2);

// 7 BigInt

let numeroGrande = BigInt("9007199254740991");
console.log(
  "Numero grande ",
  numeroGrande,
  "tipo de dato ",
  typeof numeroGrande,
);
