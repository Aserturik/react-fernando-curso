export function generateId(prefix = "id"): string {
  const randomPart = crypto.randomUUID();
  return `${prefix}-${randomPart}`;
}
