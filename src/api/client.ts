export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function getToken(): string | null {
  return localStorage.getItem('skooture_token');
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ─── Auth ────────────────────────────────────────────────────

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse<{ token: string; user: { id: string; email: string; role: string } }>(res);
  localStorage.setItem('skooture_token', data.token);
  return data;
}

export async function verifyToken(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
  }
}

export async function getMe() {
  const res = await fetch(`${API_BASE}/auth/me`, { headers: authHeaders() });
  return handleResponse<{ id: string; email: string; role: string; createdAt: string }>(res);
}

export function logout() {
  localStorage.removeItem('skooture_token');
}

// ─── Content ─────────────────────────────────────────────────

export async function getContent() {
  const res = await fetch(`${API_BASE}/content`);
  return handleResponse<Record<string, any>>(res);
}

export async function updateContent(content: Record<string, any>) {
  const res = await fetch(`${API_BASE}/content`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(content),
  });
  return handleResponse<{ success: boolean; message: string }>(res);
}

export async function resetContent() {
  const res = await fetch(`${API_BASE}/content/reset`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return handleResponse<{ success: boolean; message: string }>(res);
}

// ─── Messages ────────────────────────────────────────────────

export async function getMessages() {
  const res = await fetch(`${API_BASE}/messages`, { headers: authHeaders() });
  return handleResponse<any[]>(res);
}

export async function sendMessage(data: { name: string; email: string; message: string }) {
  const res = await fetch(`${API_BASE}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<any>(res);
}

export async function deleteMessage(id: string) {
  const res = await fetch(`${API_BASE}/messages/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse<{ success: boolean }>(res);
}

export async function markMessageRead(id: string) {
  const res = await fetch(`${API_BASE}/messages/${id}/read`, {
    method: 'PATCH',
    headers: authHeaders(),
  });
  return handleResponse<any>(res);
}
