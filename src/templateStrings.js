const nombre = "alex";
const apellido = "hernandez";

// template strings
const nombreCompleto = `${nombre} ${apellido}`;

console.log(nombreCompleto);

function getSaludo(nombre) {
  // retorna un saludo
  return `Hola ${nombre}`;
}

console.log(`el saludo es: ${getSaludo(nombre)}`);
