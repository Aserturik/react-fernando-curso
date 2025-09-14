function greet(name: string): string {
  return `Hola ${name}`;
}

const greet2 = (name: string): string => {
  return `Hola ${name}`;
};

const message = greet("Goku");
const message2 = greet2("Goku");

console.log("mensajes", { message, message2 });

// return implicito
const getUser = () => ({ uid: "ABC-123", userName: "pedrito22" });

const user = getUser();
console.log(user);
