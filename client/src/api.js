// Small fetch wrapper for the Task CRUD API.
// - Always sends Content-Type: application/json.
// - Handles 204 No Content by returning null instead of calling .json().
// - Throws an Error with the server's { error } message on non-OK responses.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function fetchJson(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  // DELETE returns 204 with no body — calling .json() would throw.
  if (res.status === 204) return null;

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return body;
}

export const listTasks = () => fetchJson('/tasks');

export const createTask = (title) =>
  fetchJson('/tasks', { method: 'POST', body: JSON.stringify({ title }) });

export const updateTask = (id, patch) =>
  fetchJson(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(patch) });

export const deleteTask = (id) =>
  fetchJson(`/tasks/${id}`, { method: 'DELETE' });