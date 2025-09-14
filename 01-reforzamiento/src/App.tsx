import "./App.css";
/* import './bases/01-const-let.ts' */
/* import './bases/02-template-strings' */
// import './bases/03-object-literal'
// import "./bases/04-arrays.ts";
// import "./bases/05-functions.ts";
// import "./bases/06-obj-destructuring.ts";
// import "./bases/07-array-destructuring";
import "./bases/08-imp-exp.ts";
import { getHeroesByOwner } from "./bases/08-imp-exp.ts";
import { Owner } from "./data/heroes.data.ts";

console.log(getHeroesByOwner(Owner.Marvel));

function App() {
  return <h1>Hola mundo</h1>;
}

export default App;
