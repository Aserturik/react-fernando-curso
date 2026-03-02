function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeCode() {
  // 6 dígitos
  return String(Math.floor(100000 + Math.random() * 900000));
}

/**
 * createSession()
 * - Representa una operación async (Promise)
 * - Puede fallar para practicar catch
 */
export function createSession() {
  return new Promise(async (resolve, reject) => {
    await wait(800);

    // 15% de probabilidad de fallo (simula error temporal)
    if (Math.random() < 0.15) {
      reject(new Error("Error temporal creando la sesión. Intenta de nuevo."));
      return;
    }

    resolve({
      id: crypto.randomUUID(),
      code: makeCode(),
      status: "open",
    });
  });
}

export function joinSession(code) {
  return new Promise(async (resolve, reject) => {
    await wait(500);

    // Simula verificar el código (en un app real, esto vendría del backend)
    // Por ahora, acepta cualquier código de 6 dígitos si hay una sesión abierta
    if (code.length !== 6 || isNaN(code)) {
      reject(new Error("Código inválido. Debe ser 6 dígitos."));
      return;
    }

    // Simula fallo aleatorio
    if (Math.random() < 0.1) {
      reject(new Error("Error conectando. Verifica el código."));
      return;
    }

    resolve({
      id: crypto.randomUUID(),
      code: code,
      status: "joined",
      joinedAt: new Date().toISOString(),
    });
  });
}

export function participate(sessionId) {
  return new Promise(async (resolve, reject) => {
    await wait(300);

    if (!sessionId) {
      reject(new Error("No estás registrado en una sesión."));
      return;
    }

    // Simula fallo aleatorio
    if (Math.random() < 0.05) {
      reject(new Error("Error enviando participación."));
      return;
    }

    resolve({
      sessionId,
      participatedAt: new Date().toISOString(),
      status: "participated",
    });
  });
}

export function closeSession(currentSession) {
  return new Promise(async (resolve, reject) => {
    await wait(600);

    if (!currentSession || currentSession.status !== "open") {
      reject(new Error("No hay una sesión abierta para cerrar."));
      return;
    }

    resolve({ ...currentSession, status: "closed" });
  });
}