import { flushSync } from 'react-dom';
import { heroes } from './data/heroes'

// const getHeroeById = (id) => {
//   return heroes.find((heroe) => {
//     if (heroe.id === id) {
//       return true
//     } else {
//       return false
//     }
//   })
// }

const getHeroeById = (id) => {
  return heroes.find((heroe) => heroe.id === id)
}

console.log(getHeroeById(2));
