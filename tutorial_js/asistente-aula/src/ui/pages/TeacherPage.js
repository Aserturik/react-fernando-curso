import { state, setState, setUI } from "../../state/state.js";
import { rerender } from "../app.ui.js";
import { createSession, closeSession } from "../../services/session.service.js";

export function createTeacherPage() {
  const container = document.createElement("main");
  container.className = "card";

  const title = document.createElement("div");
  title.className = "card__title";
  title.textContent = "Panel Docente";

  const btnOpen = document.createElement("button");
  btnOpen.className = "btn btn--primary";
  btnOpen.textContent = "Abrir sesión";

  const btnClose = document.createElement("button");
  btnClose.className = "btn ";
  btnClose.textContent = "Cerrar sesión";

  const btnBack = document.createElement("button");
  btnBack.className = "btn btn--primary";
  btnBack.textContent = "Cambiar perfil";

  // Estado de botones (simple y didáctico)
  const hasOpenSession = state.session && state.session.status === "open";
  btnOpen.disabled = state.ui.isLoading || hasOpenSession;
  btnClose.disabled = state.ui.isLoading || !hasOpenSession;

  btnOpen.addEventListener("click", async () => {
    setUI({ isLoading: true, error: "", message: "Creando sesión…" });
    rerender();

    try {
      const session = await createSession();
      setState({ session });
      setUI({ message: "Sesión creada ✅", error: "" });
    } catch (err) {
      setUI({ error: err.message || "Error desconocido", message: "" });
    } finally {
      setUI({ isLoading: false });
      rerender();
    }
  });

  btnClose.addEventListener("click", async () => {
    setUI({ isLoading: true, error: "", message: "Cerrando sesión…" });
    rerender();

    try {
      const updated = await closeSession(state.session);
      setState({ session: updated });
      setUI({ message: "Sesión cerrada ✅", error: "" });
    } catch (err) {
      setUI({ error: err.message || "Error desconocido", message: "" });
    } finally {
      setUI({ isLoading: false });
      rerender();
    }
  });

  btnBack.addEventListener("click", () => {
    setState({ role: null });
    setUI({ isLoading: false, message: "", error: "" });
    rerender();
  });

  container.append(title, btnOpen, btnClose, btnBack);
  return container;
}
