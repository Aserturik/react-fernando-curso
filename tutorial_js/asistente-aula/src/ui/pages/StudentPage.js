// src/ui/pages/StudentPage.js
// Panel del estudiante: captura el código de sesión y prepara el flujo para unirse (futuro async).

import { state, setUI, resetApp, addLogEvent } from "../../state/state.js";
import { triggerRender } from "../render.js";
import { t } from "../../i18n/i18n.js";
import { validateSessionCode } from "../../services/session.service.js";

export function createStudentPage() {
  const container = document.createElement("main");
  container.className = "card";

  const title = document.createElement("div");
  title.className = "card__title";
  title.textContent = t("student.title");

  const intro = document.createElement("p");
  intro.textContent = t("student.intro");

  const info = document.createElement("div");
  info.className = "student-info";
  info.textContent = getStudentInfoText();

  const field = document.createElement("div");
  field.className = "field";

  const label = document.createElement("label");
  label.className = "field__label";
  label.textContent = t("student.codeLabel");

  const input = document.createElement("input");
  input.className = "input";
  input.type = "text";
  input.inputMode = "numeric";
  input.autocomplete = "one-time-code";
  input.placeholder = t("student.codePlaceholder");
  input.value = state.ui?.studentCodeDraft || "";
  input.disabled = state.ui.isLoading;

  // Masking logic
  const handleInput = (e) => {
    const raw = e.target.value ?? "";
    const masked = raw.replace(/[^\d]/g, "").slice(0, 6);
    
    // Solo actualizamos el valor del DOM si es diferente para mantener el foco/cursor
    if (e.target.value !== masked) {
      e.target.value = masked;
    }

    // Guardamos en el estado silenciosamente (sin triggerRender para no perder el foco)
    state.ui.studentCodeDraft = masked;
    
    // Habilitamos/deshabilitamos el botón manualmente para que sea instantáneo
    updateButtonState();
  };

  input.addEventListener("input", handleInput);

  field.append(label, input);

  const btnJoin = document.createElement("button");
  btnJoin.className = "btn btn--primary";
  btnJoin.type = "button";
  btnJoin.textContent = t("student.join");
  
  const updateButtonState = () => {
    const isFull = (state.ui.studentCodeDraft || "").length === 6;
    btnJoin.disabled = state.ui.isLoading || !isFull;
  };

  // Inicializar estado del botón
  updateButtonState();

  btnJoin.addEventListener("click", async () => {
    const code = String(state.ui?.studentCodeDraft || "");

    setUI({
      isLoading: true,
      errorKey: "",
      messageKey: "student.joining",
      messageParams: null,
    });
    triggerRender();

    try {
      const result = await validateSessionCode(code);
      
      if (result.valid) {
        setUI({
          messageKey: "student.connectedAs",
          messageParams: { code },
          errorKey: "",
        });
        addLogEvent("log.sessionOpened", { code });
      } else {
        setUI({
          errorKey: "errors.invalidCode",
          messageKey: "",
        });
      }
    } catch (err) {
      setUI({
        errorKey: err.code || "errors.unknown",
        messageKey: "",
      });
    } finally {
      setUI({ isLoading: false });
      triggerRender();
    }
  });

  const btnBack = document.createElement("button");
  btnBack.className = "btn btn--ghost";
  btnBack.type = "button";
  btnBack.textContent = t("role.changeProfile");

  btnBack.addEventListener("click", () => {
    addLogEvent("log.backToHome");
    resetApp();
    triggerRender();
  });

  container.append(title, intro, info, field, btnJoin, btnBack);
  return container;
}


function getStudentInfoText() {
  if (state.session?.code && state.session?.status === "open") {
    return t("student.connectedAs", { code: state.session.code });
  }
  return t("student.notConnected");
}
