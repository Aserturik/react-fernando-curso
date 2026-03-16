import { useEffect, useState } from "react";
import type { Observation } from "../models/observation.model";
import { mockObservations } from "../services/observation.mock";
import {
  getAllObservations,
  saveObservations,
} from "../services/observation.service";

export default function HomePage() {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadObservations() {
      try {
        let storedObservations = await getAllObservations();

        // If empty, seed the storage and use the mock data immediately
        if (storedObservations.length === 0) {
          await saveObservations(mockObservations);
          storedObservations = mockObservations;
        }

        setObservations(storedObservations);
      } catch (error) {
        console.error("Error loading observations:", error);
      } finally {
        setIsLoading(false);
      }
    }

    void loadObservations();
  }, []);

  if (isLoading) {
    return <p>Cargando observaciones...</p>;
  }

  return (
    <main>
      <section>
        <h2>Observaciones</h2>

        {observations.length === 0 ? (
          <p>No hay observaciones registradas.</p>
        ) : (
          <ul>
            {observations.map((observation) => (
              <li key={observation.id}>
                <h3>{observation.title}</h3>
                <p>{observation.description}</p>
                <small>Estado: {observation.status}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
