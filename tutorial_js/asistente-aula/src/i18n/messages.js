// src/i18n/messages.js
// Diccionarios i18n. La UI debe consumir solo claves (keys) y traducir con t().

export const messages = {
  es: {
    brand: {
      name: "ClassSync",
      subtitle: "Sincronización de clase en tiempo real",
    },

    common: {
      tapToSelect: "Toca para seleccionar",
    },

    status: {
      idle: "Estado: listo.",
      loading: "Procesando…",
      errorPrefix: "Error: ",
      session: "Sesión",
      code: "Código",
      open: "ABIERTA",
      closed: "CERRADA",
      copyCodeAria: "Copiar código",
      codeCopied: "Código copiado",
    },

    role: {
      title: "Selecciona tu perfil",
      teacher: "Docente",
      teacherDesc:
        "Crea y cierra sesiones, gestiona asistencia y participación.",
      student: "Estudiante",
      studentDesc:
        "Registra asistencia y responde participación en tiempo real.",
      changeProfile: "Cambiar perfil",
      teacherShort: "T",
      studentShort: "S",
    },

    teacher: {
      title: "Panel Docente",
      openSession: "Abrir sesión",
      closeSession: "Cerrar sesión",
      creating: "Creando sesión…",
      closing: "Cerrando sesión…",
      createdOk: "Sesión creada ✅",
      closedOk: "Sesión cerrada ✅",
      activityLog: "Historial de actividad",
      clearHistory: "Limpiar historial",
      confirmClear: "¿Estás seguro de que deseas limpiar el historial?",
      noActivity: "No hay actividad registrada.",
    },

    log: {
      roleSelected: "Perfil seleccionado: {role}",
      langChanged: "Idioma cambiado a: {lang}",
      themeChanged: "Tema cambiado a: {theme}",
      sessionOpened: "Sesión abierta: {code}",
      sessionClosed: "Sesión cerrada",
      codeCopied: "Código de sesión copiado",
      backToHome: "Regreso al inicio",
    },

    student: {
      title: "Panel Estudiante",
      intro: "Ingresa el código para unirte a la sesión.",
      codeLabel: "Código de sesión",
      codePlaceholder: "Ejemplo: 170325",
      join: "Unirme",
      joining: "Uniéndome…",
      connectedAs: "Conectado a la sesión: {code}",
      notConnected: "Aún no estás conectado a una sesión.",
    },

    theme: { toggleAria: "Cambiar tema" },
    lang: { toggleAria: "Cambiar idioma", es: "ES", en: "EN" },

    errors: {
      tempCreateSession: "Error temporal creando la sesión. Intenta de nuevo.",
      tempCloseSession: "Error temporal cerrando la sesión. Intenta de nuevo.",
      copyFailed: "No se pudo copiar. Copia manualmente.",
      unknown: "Ocurrió un error inesperado.",
      invalidCode: "Código inválido. Verifica e intenta de nuevo.",
    },
  },

  en: {
    brand: {
      name: "ClassSync",
      subtitle: "Real-time classroom synchronization",
    },

    common: {
      tapToSelect: "Tap to select",
    },

    status: {
      idle: "Status: ready.",
      loading: "Processing…",
      errorPrefix: "Error: ",
      session: "Session",
      code: "Code",
      open: "OPEN",
      closed: "CLOSED",
      copyCodeAria: "Copy code",
      codeCopied: "Code copied",
    },

    role: {
      title: "Choose your profile",
      teacher: "Teacher",
      teacherDesc:
        "Create and close sessions, manage attendance and participation.",
      student: "Student",
      studentDesc: "Check in attendance and answer participation in real time.",
      changeProfile: "Switch profile",
      teacherShort: "T",
      studentShort: "S",
    },

    teacher: {
      title: "Teacher Panel",
      openSession: "Open session",
      closeSession: "Close session",
      creating: "Creating session…",
      closing: "Closing session…",
      createdOk: "Session created ✅",
      closedOk: "Session closed ✅",
      activityLog: "Activity Log",
      clearHistory: "Clear History",
      confirmClear: "Are you sure you want to clear the history?",
      noActivity: "No activity recorded.",
    },

    log: {
      roleSelected: "Profile selected: {role}",
      langChanged: "Language changed to: {lang}",
      themeChanged: "Theme changed to: {theme}",
      sessionOpened: "Session opened: {code}",
      sessionClosed: "Session closed",
      codeCopied: "Session code copied",
      backToHome: "Returned to home",
    },

    student: {
      title: "Student Panel",
      intro: "Enter the code to join the session.",
      codeLabel: "Session code",
      codePlaceholder: "Example: 170325",
      join: "Join",
      joining: "Joining…",
      connectedAs: "Connected to session: {code}",
      notConnected: "You are not connected to a session yet.",
    },

    theme: { toggleAria: "Toggle theme" },
    lang: { toggleAria: "Toggle language", es: "ES", en: "EN" },

    errors: {
      tempCreateSession:
        "Temporary error creating the session. Please try again.",
      tempCloseSession:
        "Temporary error closing the session. Please try again.",
      copyFailed: "Couldn't copy. Please copy manually.",
      unknown: "An unexpected error occurred.",
      invalidCode: "Invalid code. Please check and try again.",
    },
  },
};
