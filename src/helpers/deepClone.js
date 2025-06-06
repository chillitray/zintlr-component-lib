/**
 * Deep‑clone any JSON‑serializable value.
 * Falls back to JSON.parse/JSON.stringify if structuredClone isn't available.
 */
export function deepClone(obj) {
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}
