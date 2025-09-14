import { heroes, Owner, type Hero } from "../data/heroes.data";

const getHeroById = (id: number): Hero | undefined => {
  const hero = heroes.find((hero) => {
    return hero.id === id;
  });

  return hero;
};

// console.log(getHeroById(1));
//

export const getHeroesByOwner = (owner: Owner): Hero[] => {
  if (owner != Owner.Marvel && owner != Owner.DC) {
    throw new Error("El owner no es valido");
  }
  const ownerHeroes: Hero[] = [];

  for (const heroe of heroes) {
    if (heroe.owner === owner) {
      ownerHeroes.push(heroe);
    }
  }

  return ownerHeroes;
};
