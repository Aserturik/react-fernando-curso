export const state = {
  role: null, // null | "teacher" | "student"
  session: null, // { id, code, status } | null
  studentSession: null, // Para estudiantes: { id, code, status, joinedAt } | null
  ui: {
    isLoading: false, // pending de una operación
    message: "", // mensaje de éxito o info
    error: "", // mensaje de error
  },
};

export function setState(patch) {
  Object.assign(state, patch);
}

export function setUI(patch) {
  Object.assign(state.ui, patch);
}
