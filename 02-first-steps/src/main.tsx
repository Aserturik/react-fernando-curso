import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FirstStepsApp } from "./FirstStepsApp.tsx";
import { MyAwesomeApp } from "./MyAwesomeApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FirstStepsApp />
    <MyAwesomeApp />
  </StrictMode>,
);
