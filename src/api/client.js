// ------------------------------------------------------------------
// api/client.js — the single place the frontend knows about the backend.
//
// Configure via .env (Create React App reads REACT_APP_* at build time):
//   Development:  REACT_APP_API_URL=http://localhost:8000
//   Production:   REACT_APP_API_URL=            (empty = same origin,
//                 correct for the nginx setup where /api/ is proxied)
// ------------------------------------------------------------------

const raw = process.env.REACT_APP_API_URL;
export const API_URL = (raw === undefined ? "http://localhost:8000" : raw).replace(/\/+$/, "");

/** GET a JSON endpoint. Unwraps DRF pagination ({count, results}) automatically. */
export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`API ${res.status} on ${path}`);
  const data = await res.json();
  if (data && typeof data === "object" && Array.isArray(data.results)) return data.results;
  return data;
}

/** GET every page of a paginated list endpoint (follows `next` links). */
export async function apiGetAll(path) {
  let url = `${API_URL}${path}`;
  const out = [];
  while (url) {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`API ${res.status} on ${url}`);
    const data = await res.json();
    if (Array.isArray(data)) return data;         // non-paginated endpoint
    out.push(...(data.results || []));
    url = data.next;
  }
  return out;
}

/** POST JSON. Returns { ok, status, data } so forms can map field errors. */
export async function apiPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  let data = null;
  try { data = await res.json(); } catch { /* empty body */ }
  return { ok: res.ok, status: res.status, data };
}
