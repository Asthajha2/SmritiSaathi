// Safe browser storage: some privacy modes/embedded browsers disable localStorage.
// Keep the app usable with an in-memory fallback instead of crashing the React tree.
const memory = new Map();
let nativeStore = null;
try {
  const candidate = window.localStorage;
  const probe = '__smriti_storage_probe__';
  candidate.setItem(probe, '1');
  candidate.removeItem(probe);
  nativeStore = candidate;
} catch {}

export const safeStorage = {
  getItem(key) {
    try { return nativeStore?.getItem(key) ?? memory.get(key) ?? null; } catch { return memory.get(key) ?? null; }
  },
  setItem(key, value) {
    memory.set(key, String(value));
    try { nativeStore?.setItem(key, String(value)); } catch {}
  },
  removeItem(key) {
    memory.delete(key);
    try { nativeStore?.removeItem(key); } catch {}
  }
};
