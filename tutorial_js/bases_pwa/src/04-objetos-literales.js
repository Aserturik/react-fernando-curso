import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Objetos literales</h1>
</div>
`;

let character = {
  name: "Gandalf",
  age: 2019,
  isWizard: true,

  staff: {
    material: "madera",
    hasCrystal: true,
    powerLevel: 9000,
  },
  spells: ["luz", "Fuego", "Hielo"],
};

console.log(character);
character.age = 2020;
console.log(character);
character.isWizard = false;
console.log(character);
character.name = "Albertano";
console.log(character);
character.staff.powerLevel = 10000;
console.log(character.staff);

delete character.spells;
console.log("Sin spells", character);
