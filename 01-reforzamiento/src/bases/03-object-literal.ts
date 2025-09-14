const ironman = {
  firstName: "Tony",
  lastName: "Stark",
  age: 34,
  address: {
    postalCode: 222,
    city: "New York",
  },
};

// esto copia la referencia a primer nivel (solo los atributos de primer nivel por que si cambio spiderman.address.postalCode = 333, para ironman también cambia)
// const spiderman = { ...ironman };

// esto si hace un clon completo del objeto y sus objetos hijos
// DeepClone
const spiderman = structuredClone(ironman);

spiderman.firstName = "Peter";
spiderman.lastName = "Parker";
spiderman.age = 22;

spiderman.address.city = "Philadelphia";

console.log(ironman);
console.log(spiderman);
