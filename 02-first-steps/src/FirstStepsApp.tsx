import { ItemCounter } from "./shopping-cart/ItemCounter.tsx";

export function FirstStepsApp() {
  return (
    <>
      <h1>
        Carrito de compras
      </h1>
      <ItemCounter name="Nintendo Switch 2" quantity={1} />
      <ItemCounter name="Psp" quantity={20} />
      <ItemCounter name="Xbox One" quantity={4} />
    </>
  );
}
