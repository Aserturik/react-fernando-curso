import type { Observation } from "../models/observation.models";
import { dbPromise } from "./db";

const STORE_NAME = "observations";

export async function getAllObservations(): Promise<Observation[]> {
  const db = await dbPromise;
  return await db.getAll(STORE_NAME);
}

export async function saveObservations(
  observation: Observation,
): Promise<void> {
  const db = await dbPromise;
  await db.put(STORE_NAME, observation);
}

export async function saveObselvations(
  observations: Observation[],
): Promise<void> {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, "readwrite");

  for (const observation of observations) {
    await tx.store.put(observation);
  }

  await tx.done;
}
