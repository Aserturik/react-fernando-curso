import { ItemCounter } from "./shopping-cart/ItemCounter.tsx";

interface ItemInCart {
  productName: string;
  quantity: number;
}
const itemsInCart: ItemInCart[] = [
  { productName: "Nintedo Switch", quantity: 2 },
  { productName: "Xbox One", quantity: 4 },
  { productName: "Play Station", quantity: 3 },
  { productName: "Nintendo Ds", quantity: 4 },
  { productName: "Nintendo Ds", quantity: 4 },
];

export function FirstStepsApp() {
  return (
    <>
      <h1>
        Carrito de compras
      </h1>

      {itemsInCart.map(({ productName, quantity }) => (
        <ItemCounter
          key={productName}
          name={productName}
          quantity={quantity}
        />
      ))}

      {/* <ItemCounter name="Nintendo Switch 2" quantity={1} /> */}
      {/* <ItemCounter name="Psp" quantity={20} /> */}
      {/* <ItemCounter name="Xbox One" quantity={4} /> */}
    </>
  );
}
