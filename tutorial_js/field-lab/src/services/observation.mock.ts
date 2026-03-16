import type { Observation } from "../models/observation.models";

const now = new Date().toISOString();
export const mockObservations: Observation[] = [
  {
    id: "obs-001",
    title: "Entrada principal",
    description: "Observación de la entrada principal del edificio.",
    status: "draft",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "obs-002",
    title: "Bloque a",
    description: "Se registró observación general del entorno.",
    status: "pending",
    createdAt: now,
    updatedAt: now,
  },
];
