const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function fetchBooks() {
  const res = await fetch(`${API_URL}/api/books`);
  if (!res.ok) {
    throw new Error('Failed to fetch books');
  }
  return res.json();
}

export async function addBook({ title, borrowerName, checkoutDate }) {
  const res = await fetch(`${API_URL}/api/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, borrowerName, checkoutDate }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.error || 'Failed to add book');
  }

  return res.json();
}
