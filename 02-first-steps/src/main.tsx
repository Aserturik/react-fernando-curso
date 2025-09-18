import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FirstStepsApp } from "./FirstStepsApp.tsx";
import { MyAwesomeApp } from "./MyAwesomeApp.tsx";
import { ItemCounter } from "./shopping-cart/ItemCounter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FirstStepsApp />
    {/* <MyAwesomeApp /> */}
    {/* <ItemCounter /> */}
  </StrictMode>,
);
