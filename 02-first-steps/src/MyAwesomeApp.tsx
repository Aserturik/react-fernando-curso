import type { CSSProperties } from "react";

const firstName: string = "Alex";
const lastName: string = "Hernandez";
const adress = {
  zipCode: "ABC-123",
  country: "Colombia",
};

const favoriteGames = ["Eldeng Ring", "Mario"];
const isActive = false;
const myStyles: CSSProperties = {
  backgroundColor: isActive ? "blue" : "red",
  borderRadius: isActive ? 10 : 50,
  padding: 10,
  margin: 20,
};
export const MyAwesomeApp = () => {
  return (
    <div>
      <h1>{firstName}</h1>
      <h2>{lastName}</h2>
      <p>{favoriteGames.join(", ")}</p>
      <h1>{isActive ? "Usuario Activo" : "Usuario No Activo"}</h1>
      <p
        style={myStyles}
      >
        {JSON.stringify(adress)}
      </p>
    </div>
  );
};

// export function MyAwesomeApp() {
//   return (
//     <div>
//       <p>Alex</p>
//       <p>Hernandez</p>
//     </div>
//   );
// }
