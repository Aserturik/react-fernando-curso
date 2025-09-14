const myArray: (number | string)[] = [1, 2, 3, 4, 5];

// const myArray2 = structuredClone(myArray);
const myArray2 = [...myArray];
myArray.push(6);

console.log({ myArray, myArray2 });
