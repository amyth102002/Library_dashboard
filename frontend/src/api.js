function resolveApiBase() {
  const raw = import.meta.env.VITE_API_URL;
  let url = (typeof raw === 'string' ? raw : '').trim();

  if (!url) {
    url = 'http://localhost:4000';
  }

  // Avoid https://service.onrender.com/api + /api/books → /api/api/books (404)
  url = url.replace(/\/+$/, '');
  url = url.replace(/\/api$/i, '');

  return url;
}

const API_URL = resolveApiBase();

async function readError(res, fallback) {
  const body = await res.json().catch(() => ({}));
  if (body.error) return body.error;
  return `${fallback} (${res.status})`;
}

export async function fetchBooks() {
  let res;
  try {
    res = await fetch(`${API_URL}/api/books`);
  } catch {
    throw new Error(
      'Could not reach the API. Set VITE_API_URL on Vercel to your Render URL (no trailing /api) and redeploy.'
    );
  }

  if (!res.ok) {
    throw new Error(await readError(res, 'Failed to fetch books'));
  }

  return res.json();
}

export async function addBook({ title, borrowerName, checkoutDate }) {
  let res;
  try {
    res = await fetch(`${API_URL}/api/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, borrowerName, checkoutDate }),
    });
  } catch {
    throw new Error(
      'Could not reach the API. Set VITE_API_URL on Vercel to your Render URL (no trailing /api) and redeploy.'
    );
  }

  if (!res.ok) {
    throw new Error(await readError(res, 'Failed to add book'));
  }

  return res.json();
}
