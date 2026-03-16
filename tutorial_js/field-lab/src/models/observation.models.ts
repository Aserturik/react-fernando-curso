export type ObservationStatus = "draft" | "pending" | "completed";

export interface Observation {
  id: string;
  title: string;
  description: string;
  status: ObservationStatus;
  createdAt: string;
  updatedAt: string;
}
