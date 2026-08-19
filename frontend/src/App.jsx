import { useEffect, useState, useCallback } from 'react';
import { fetchBooks, addBook } from './api';
import AddBookForm from './AddBookForm';
import BookCard from './Bookcard';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBooks = useCallback(async () => {
    try {
      const data = await fetchBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const handleBookAdded = async (bookData) => {
    await addBook(bookData);
    await loadBooks(); // refresh the list so the new book (and its computed status) shows up
  };

  return (
    <div className="app">
      <h1>📚 Library Dashboard</h1>

      <AddBookForm onBookAdded={handleBookAdded} />

      <h2>Borrowed Books</h2>
      {loading && <p>Loading books...</p>}
      {error && <p className="form-error">Error: {error}</p>}

      {!loading && !error && books.length === 0 && <p>No books yet — add one above.</p>}

      {!loading && !error && books.length > 0 && (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
