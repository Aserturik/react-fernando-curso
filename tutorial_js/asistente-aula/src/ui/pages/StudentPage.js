import { state, setState, setUI } from "../../state/state.js";
import { rerender } from "../app.ui.js";
import { joinSession, participate } from "../../services/session.service.js";

export function createStudentPage() {
  const container = document.createElement("main");
  container.className = "card";

  const title = document.createElement("div");
  title.className = "card__title";
  title.textContent = "Panel Estudiante";

  const codeInput = document.createElement("input");
  codeInput.type = "text";
  codeInput.placeholder = "Ingresa código de 6 dígitos";
  codeInput.className = "input";

  const btnRegister = document.createElement("button");
  btnRegister.className = "btn btn--primary";
  btnRegister.textContent = "Registrar asistencia";

  const btnParticipate = document.createElement("button");
  btnParticipate.className = "btn btn--primary";
  btnParticipate.textContent = "Responder participación";

  const backBtn = document.createElement("button");
  backBtn.className = "btn";
  backBtn.textContent = "Cambiar perfil";

  // Estado de botones
  const hasJoined = state.studentSession && state.studentSession.status === "joined";
  const hasParticipated = state.studentSession && state.studentSession.status === "participated";
  btnRegister.disabled = state.ui.isLoading || hasJoined;
  btnParticipate.disabled = state.ui.isLoading || !hasJoined || hasParticipated;

  btnRegister.addEventListener("click", async () => {
    const code = codeInput.value.trim();
    if (!code) {
      setUI({ error: "Ingresa un código de sesión.", message: "" });
      rerender();
      return;
    }

    setUI({ isLoading: true, error: "", message: "Registrando asistencia…" });
    rerender();

    try {
      const studentSession = await joinSession(code);
      setState({ studentSession });
      setUI({ message: "Asistencia registrada ✅", error: "" });
    } catch (err) {
      setUI({ error: err.message || "Error desconocido", message: "" });
    } finally {
      setUI({ isLoading: false });
      rerender();
    }
  });

  btnParticipate.addEventListener("click", async () => {
    setUI({ isLoading: true, error: "", message: "Enviando participación…" });
    rerender();

    try {
      const result = await participate(state.studentSession.id);
      setState({ studentSession: { ...state.studentSession, status: "participated" } });
      setUI({ message: "Participación enviada ✅", error: "" });
    } catch (err) {
      setUI({ error: err.message || "Error desconocido", message: "" });
    } finally {
      setUI({ isLoading: false });
      rerender();
    }
  });

  backBtn.addEventListener("click", () => {
    setState({ role: null, studentSession: null });
    setUI({ isLoading: false, message: "", error: "" });
    rerender();
  });

  container.append(title, codeInput, btnRegister, btnParticipate, backBtn);
  return container;
}
