import { openDB } from "idb";

export const dbPromise = openDB("field-lab-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("observations")) {
      db.createObjectStore("observations", { keyPath: "id" });
    }
  },
});
