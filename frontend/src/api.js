// All calls to the Express backend live here
const API_URL = "http://localhost:5000/api/tasks";

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const getTasks = () => request(API_URL);

export const addTask = (title) =>
  request(API_URL, { method: "POST", body: JSON.stringify({ title }) });

export const updateTask = (id, updates) =>
  request(`${API_URL}/${id}`, { method: "PUT", body: JSON.stringify(updates) });

export const deleteTask = (id) =>
  request(`${API_URL}/${id}`, { method: "DELETE" });
