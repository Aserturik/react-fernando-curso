// src/ui/pages/TeacherPage.js
// Panel del docente: crear y cerrar sesión (operaciones async) y volver al inicio.

import {
  state,
  setState,
  setUI,
  resetApp,
  resetUI,
  addLogEvent,
  clearLog,
} from "../../state/state.js";
import { triggerRender } from "../render.js";
import { createSession, closeSession } from "../../services/session.service.js";
import { t } from "../../i18n/i18n.js";

export function createTeacherPage() {
  const container = document.createElement("main");
  container.className = "card";

  const title = document.createElement("div");
  title.className = "card__title";
  title.textContent = t("teacher.title");

  const btnOpen = document.createElement("button");
  btnOpen.className = "btn btn--primary";
  btnOpen.type = "button";
  btnOpen.textContent = t("teacher.openSession");

  const btnClose = document.createElement("button");
  btnClose.className = "btn btn--danger";
  btnClose.type = "button";
  btnClose.textContent = t("teacher.closeSession");

  const btnBack = document.createElement("button");
  btnBack.className = "btn btn--ghost";
  btnBack.type = "button";
  btnBack.textContent = t("role.changeProfile");

  const hasOpenSession = state.session?.status === "open";
  btnOpen.disabled = state.ui.isLoading || hasOpenSession;
  btnClose.disabled = state.ui.isLoading || !hasOpenSession;

  btnOpen.addEventListener("click", async () => {
    await runAction({
      loadingKey: "teacher.creating",
      action: async () => {
        const session = await createSession();
        setState({ session });
        // Persistir sesión en localStorage para que el Student pueda validarla
        localStorage.setItem("classsync_session", JSON.stringify(session));
        addLogEvent("log.sessionOpened", { code: session.code });
      },
      successKey: "teacher.createdOk",
    });
  });

  btnClose.addEventListener("click", async () => {
    await runAction({
      loadingKey: "teacher.closing",
      action: async () => {
        const updated = await closeSession(state.session);
        setState({ session: updated });
        // Marcar sesión como cerrada en localStorage
        if (updated) {
          localStorage.setItem("classsync_session", JSON.stringify(updated));
        } else {
          localStorage.removeItem("classsync_session");
        }
        addLogEvent("log.sessionClosed");
      },
      successKey: "teacher.closedOk",
    });
  });

  // Volver al inicio: limpia estado de rol y sesión para evitar estados pegados.
  btnBack.addEventListener("click", () => {
    addLogEvent("log.backToHome");
    resetApp();
    triggerRender();
  });

  container.append(title, btnOpen, btnClose, btnBack);

  // Activity Log Section
  const logSection = createActivityLogSection();
  container.append(logSection);

  return container;
}

function createActivityLogSection() {
  const section = document.createElement("section");
  section.className = "activity-log";
  section.style.marginTop = "2rem";
  section.style.borderTop = "1px solid var(--border)";
  section.style.paddingTop = "1rem";

  const header = document.createElement("div");
  header.className = "activity-log__header";
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.marginBottom = "1rem";

  const logTitle = document.createElement("h3");
  logTitle.style.fontSize = "1rem";
  logTitle.style.margin = "0";
  logTitle.textContent = t("teacher.activityLog");

  const btnClear = document.createElement("button");
  btnClear.className = "btn btn--ghost btn--sm";
  btnClear.style.padding = "0.25rem 0.5rem";
  btnClear.style.fontSize = "0.8rem";

  // Confirmation logic: simple double-click pattern or prompt
  const isConfirming = state.ui.isConfirmingClear;
  btnClear.textContent = isConfirming ? t("teacher.confirmClear") : t("teacher.clearHistory");
  if (isConfirming) btnClear.classList.add("btn--danger");

  btnClear.addEventListener("click", () => {
    if (state.ui.isConfirmingClear) {
      clearLog();
      setUI({ isConfirmingClear: false });
      triggerRender();
    } else {
      setUI({ isConfirmingClear: true });
      triggerRender();
      // Auto-reset confirmation after 3s
      setTimeout(() => {
        if (state.ui.isConfirmingClear) {
          setUI({ isConfirmingClear: false });
          triggerRender();
        }
      }, 3000);
    }
  });

  header.append(logTitle, btnClear);
  section.append(header);

  const list = document.createElement("ul");
  list.className = "activity-log__list";
  list.style.listStyle = "none";
  list.style.padding = "0";
  list.style.margin = "0";
  list.style.fontSize = "0.85rem";
  list.style.maxHeight = "200px";
  list.style.overflowY = "auto";

  if (state.activityLog.length === 0) {
    const empty = document.createElement("li");
    empty.style.color = "var(--text-muted)";
    empty.style.fontStyle = "italic";
    empty.textContent = t("teacher.noActivity");
    list.append(empty);
  } else {
    state.activityLog.forEach((event) => {
      const item = document.createElement("li");
      item.style.padding = "0.4rem 0";
      item.style.borderBottom = "1px solid var(--border-light)";
      
      const time = document.createElement("span");
      time.style.color = "var(--text-muted)";
      time.style.marginRight = "0.5rem";
      time.style.fontSize = "0.75rem";
      const date = new Date(event.timestamp);
      time.textContent = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const text = document.createElement("span");
      text.textContent = t(event.key, event.params);

      item.append(time, text);
      list.append(item);
    });
  }

  section.append(list);
  return section;
}

/**
 * Ejecuta una acción async con un patrón común de UI:
 * - activa loading
 * - muestra mensaje de progreso
 * - ejecuta acción
 * - muestra mensaje de éxito o error
 * - desactiva loading
 */
async function runAction({ loadingKey, action, successKey }) {
  setUI({
    isLoading: true,
    messageKey: loadingKey,
    messageParams: null,
    errorKey: "",
    errorParams: null,
  });
  triggerRender();

  try {
    await action();
    setUI({
      messageKey: successKey,
      messageParams: null,
      errorKey: "",
      errorParams: null,
    });
  } catch (err) {
    const key = err?.code || "errors.unknown";
    setUI({
      errorKey: key,
      errorParams: null,
      messageKey: "",
      messageParams: null,
    });
  } finally {
    setUI({ isLoading: false });
    triggerRender();
  }
}
