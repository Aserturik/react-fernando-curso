import { setState } from "../../state/state.js";
import { rerender } from "../app.ui.js";

export function createRolePage() {
  const container = document.createElement("main");
  container.className = "card";

  const title = document.createElement("div");
  title.className = "card__title";
  title.textContent = "Selecciona tu perfil";

  const btnTeacher = document.createElement("button");
  btnTeacher.className = "btn btn--primary";
  btnTeacher.textContent = "Docente";

  const btnStudent = document.createElement("button");
  btnStudent.className = "btn btn--primary";
  btnStudent.textContent = "Estudiante";

  btnTeacher.addEventListener("click", () => {
    setState({ role: "teacher" });
    rerender();
  });

  btnStudent.addEventListener("click", () => {
    setState({ role: "student" });
    rerender();
  });

  container.append(title, btnTeacher, btnStudent);
  return container;
}
