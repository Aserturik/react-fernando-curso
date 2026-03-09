// src/services/session.service.js
// Servicio simulado (mock) para practicar async/await y manejo de errores.
// En una versión real, estas funciones harían fetch() a un backend.
//
// Contrato de errores:
// - Lanzan Error con propiedad err.code = "errors.<key>" (para i18n).

const CREATE_DELAY_MS = 600;
const CLOSE_DELAY_MS = 500;

const CREATE_FAIL_RATE = 0.25; // 25%
const CLOSE_FAIL_RATE = 0.2; // 20%

const CODE_MIN = 100000;
const CODE_RANGE = 900000;

function makeSession() {
  return {
    status: "open",
    code: String(Math.floor(CODE_MIN + Math.random() * CODE_RANGE)),
  };
}

/**
 * Crea una sesión y retorna { status: "open", code: "######" }.
 * Puede fallar con err.code = "errors.tempCreateSession".
 */
export async function createSession() {
  await sleep(CREATE_DELAY_MS);

  if (Math.random() < CREATE_FAIL_RATE) {
    const err = new Error("TEMP_CREATE_SESSION");
    err.code = "errors.tempCreateSession";
    throw err;
  }

  return makeSession();
}

/**
 * Cierra una sesión existente y retorna { ...session, status: "closed" }.
 * Puede fallar con err.code = "errors.tempCloseSession".
 */
export async function closeSession(session) {
  await sleep(CLOSE_DELAY_MS);

  if (!session) {
    // Si no hay sesión, devolvemos null para indicar "nada que cerrar".
    return null;
  }

  if (Math.random() < CLOSE_FAIL_RATE) {
    const err = new Error("TEMP_CLOSE_SESSION");
    err.code = "errors.tempCloseSession";
    throw err;
  }

  return { ...session, status: "closed" };
}

/**
 * Valida un código de sesión (mock).
 * - Simula retraso (300-600ms).
 * - 10% de probabilidad de error aleatorio.
 * - Solo es válido si el código coincide exactamente con el código guardado en localStorage
 *   que generó el Teacher.
 * - Retorna { valid: boolean }.
 */
export async function validateSessionCode(code) {
  const delay = 300 + Math.random() * 300;
  await sleep(delay);

  if (Math.random() < 0.1) {
    const err = new Error("VALIDATION_FAILED");
    err.code = "errors.unknown";
    throw err;
  }

  // Recuperamos la sesión actual del "servidor" (localStorage)
  const storedSession = localStorage.getItem("classsync_session");
  let serverCode = null;

  if (storedSession) {
    try {
      const parsed = JSON.parse(storedSession);
      if (parsed.status === "open") {
        serverCode = parsed.code;
      }
    } catch (e) {
      console.error("Error parsing stored session", e);
    }
  }

  // Es válido SI hay una sesión abierta Y el código coincide exactamente
  const isValid = serverCode && code === serverCode;

  return { valid: isValid };
}

/**
 * Helper para simular latencia (Promise).
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
