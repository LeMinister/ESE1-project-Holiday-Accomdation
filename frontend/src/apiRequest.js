import API from "./api";

export async function apiRequest(endpoint, options = {}) {
  try {
    const res = await fetch(`${API}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    let data = null;

    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      throw new Error(
        data?.detail ||
        data?.error ||
        `Request failed with status ${res.status}`
      );
    }

    return data;

  } catch (err) {
    throw new Error(
      err.message === "Failed to fetch"
        ? "Cannot connect to backend. Is Django running?"
        : err.message
    );
  }
}