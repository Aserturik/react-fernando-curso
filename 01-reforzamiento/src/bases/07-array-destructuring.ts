const characterNames: string[] = ["Goku", "Vegeta", "Trunks"];

const [, , p3] = characterNames;

console.log({ p3 });

const returnsArrayFn = () => {
  return ["ABC", 123] as const;
};

const [letters, numbers] = returnsArrayFn();
console.log(letters, numbers);

function useState(name: string) {
  return [
    name,
    (newName: string) => {
      console.log(newName);
    },
  ] as const;
}

const [name, setName] = useState("Goku");

console.log(name);
setName("Vegeta");
