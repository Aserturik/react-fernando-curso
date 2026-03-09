// src/ui/components/ActivityLog.js
// Componente de historial de actividad reutilizable.

import { state, setUI, clearLog } from "../../state/state.js";
import { triggerRender } from "../render.js";
import { t } from "../../i18n/i18n.js";

export function createActivityLog() {
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

  // Lógica de confirmación
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
      // Auto-reset confirmation después de 3s
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
