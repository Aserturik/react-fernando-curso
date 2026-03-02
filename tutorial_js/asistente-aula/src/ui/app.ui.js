import { state } from "../state/state.js";
import { createRolePage } from "./pages/RolePage.js";
import { createTeacherPage } from "./pages/TeacherPage.js";
import { createStudentPage } from "./pages/StudentPage.js";

let _mount = null;

export function createAppRoot(mount) {
  _mount = mount;
  render();
}

export function rerender() {
  render();
}

function render() {
  if (!_mount) return;

  _mount.innerHTML = "";

  const app = document.createElement("div");
  app.className = "app";

  app.append(createHeader(), createStatusBar(), createMain());

  _mount.append(app);
}

function createHeader() {
  const header = document.createElement("header");
  header.className = "header";

  const title = document.createElement("h1");
  title.textContent = "Asistente Docente";

  const subtitle = document.createElement("p");
  subtitle.textContent = "Sistema de asistencia y participación";

  header.append(title, subtitle);
  return header;
}

function createStatusBar() {
  const bar = document.createElement("div");
  bar.className = "status";

  if (state.ui.error) {
    bar.textContent = "Error: " + state.ui.error;
    bar.dataset.variant = "error";
  } else if (state.ui.isLoading) {
    bar.textContent = "Procesando…";
    bar.dataset.variant = "loading";
  } else if (state.ui.message) {
    bar.textContent = state.ui.message;
    bar.dataset.variant = "ok";
  } else {
    bar.textContent = "Estado: listo.";
    bar.dataset.variant = "idle";
  }

  if (state.session) {
    const extra = document.createElement("div");
    extra.className = "status__session";
    extra.textContent = `Sesión: ${state.session.status.toUpperCase()} | Código: ${state.session.code}`;
    bar.append(extra);
  }

  if (state.studentSession) {
    const extra = document.createElement("div");
    extra.className = "status__session";
    extra.textContent = `Estudiante: ${state.studentSession.status.toUpperCase()} | Código: ${state.studentSession.code}`;
    bar.append(extra);
  }

  return bar;
}

function createMain() {
  if (!state.role) return createRolePage();
  if (state.role === "teacher") return createTeacherPage();
  return createStudentPage();
}
