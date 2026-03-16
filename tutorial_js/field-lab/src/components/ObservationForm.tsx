import React, { useState } from "react";

interface ObservationFormProps {
  onSubmit: (data: { title: string; description: string }) => Promise<void>;
}

export default function ObservationForm({ onSubmit }: ObservationFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setErrorMessage("El título es obligatorio.");
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage("");

      await onSubmit({
        title: trimmedTitle,
        description: trimmedDescription,
      });

      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error saving observation:", error);
      setErrorMessage("No fue posible guardar la observación.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="observation-form">
      <div>
        <label htmlFor="title">Título:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Acceso Norte"
          disabled={isSaving}
        />
      </div>

      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSaving}
          placeholder="Agrega detalles adicionales sobre la observación"
          rows={4}
        />
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button type="submit" disabled={isSaving}>
        {isSaving ? "Guardando..." : "Guardar Observación"}
      </button>
    </form>
  );
}
