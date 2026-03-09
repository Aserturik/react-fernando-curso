// src/state/state.js
// Estado central de la aplicación (single source of truth).
// Regla: la UI renderiza a partir de este objeto y solo se modifica con setState/setUI.

const STORAGE_KEY = "classsync_log";
const LOG_LIMIT = 20;

function loadInitialLog() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error loading activity log", e);
    return [];
  }
}

function loadInitialSession() {
  try {
    const stored = localStorage.getItem("classsync_session");
    if (!stored) return null;
    const session = JSON.parse(stored);
    // Solo restauramos si está abierta
    return session.status === "open" ? session : null;
  } catch (e) {
    return null;
  }
}

export const state = {
  // Pantalla actual: null (home) | "teacher" | "student"
  role: null,

  // Historial de actividad persistente
  activityLog: loadInitialLog(),

  // Estado de sesión compartido entre roles (cuando aplique):
  // - code: string
  // - status: "open" | "closed" | "pending" (placeholder para futuras operaciones async)
  session: loadInitialSession(),

  // Estado de UI global (mensajes, errores y loading)
  ui: {
    isLoading: false,

    // Claves i18n (la UI traduce en render; evita mensajes "pegados" al cambiar idioma)
    messageKey: "",
    messageParams: null,

    errorKey: "",
    errorParams: null,

    // Campos temporales de UI (ej: input draft)
    studentCodeDraft: "",
  },
};

/**
 * Actualiza el estado raíz. Acepta:
 * - un objeto patch (merge superficial)
 * - una función updater(prevState) => patch (para evitar condiciones de carrera)
 */
export function setState(patchOrUpdater) {
  const patch =
    typeof patchOrUpdater === "function"
      ? patchOrUpdater(state)
      : patchOrUpdater;

  if (!patch || typeof patch !== "object") return;

  // Merge superficial del estado raíz
  Object.assign(state, patch);
}

/**
 * Actualiza únicamente state.ui (merge superficial).
 */
export function setUI(patchOrUpdater) {
  const patch =
    typeof patchOrUpdater === "function"
      ? patchOrUpdater(state.ui)
      : patchOrUpdater;

  if (!patch || typeof patch !== "object") return;

  Object.assign(state.ui, patch);
}

/**
 * Limpia mensajes/errores (útil al navegar entre pantallas o después de acciones).
 */
export function resetUI() {
  setUI({
    isLoading: false,
    messageKey: "",
    messageParams: null,
    errorKey: "",
    errorParams: null,
  });
}

/**
 * Resetea la app al estado "home" sin sesión.
 */
export function resetApp() {
  setState({
    role: null,
    session: null,
  });
  resetUI();
  setUI({ studentCodeDraft: "" });
}

/**
 * Muestra un mensaje i18n por un tiempo y luego lo limpia.
 * Ideal para "copiado", "guardado", etc.
 */
export function flashMessageKey(messageKey, durationMs = 1500) {
  setUI({
    messageKey,
    messageParams: null,
    errorKey: "",
    errorParams: null,
  });

  const current = messageKey;

  setTimeout(() => {
    // Solo limpia si el mensaje no fue reemplazado por otro
    // y la UI no está en loading ni mostrando error.
    if (
      state.ui.messageKey === current &&
      !state.ui.isLoading &&
      !state.ui.errorKey
    ) {
      setUI({ messageKey: "", messageParams: null });
    }
  }, durationMs);
}

/**
 * Agrega un evento al historial de actividad con persistencia y límite de 20.
 * Usa FIFO (First-In-First-Out) para mantener el límite.
 */
export function addLogEvent(eventKey, params = null) {
  const newEvent = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    key: eventKey,
    params,
  };

  const newLog = [newEvent, ...state.activityLog].slice(0, LOG_LIMIT);

  setState({ activityLog: newLog });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newLog));
}

/**
 * Limpia el historial de actividad.
 */
export function clearLog() {
  setState({ activityLog: [] });
  localStorage.removeItem(STORAGE_KEY);
}
