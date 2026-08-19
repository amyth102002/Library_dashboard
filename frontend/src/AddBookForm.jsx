import { useState } from 'react';

function todayISO() {
  const d = new Date();
  return d.toISOString().split('T')[0]; // YYYY-MM-DD, for the date input default
}

function AddBookForm({ onBookAdded }) {
  const [title, setTitle] = useState('');
  const [borrowerName, setBorrowerName] = useState('');
  const [checkoutDate, setCheckoutDate] = useState(todayISO());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !borrowerName.trim() || !checkoutDate) {
      setError('All fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      await onBookAdded({ title: title.trim(), borrowerName: borrowerName.trim(), checkoutDate });
      // Reset form after a successful add
      setTitle('');
      setBorrowerName('');
      setCheckoutDate(todayISO());
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <h2>Add a Borrowed Book</h2>

      <div className="form-row">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. 1984"
        />
      </div>

      <div className="form-row">
        <label htmlFor="borrowerName">Borrower Name</label>
        <input
          id="borrowerName"
          type="text"
          value={borrowerName}
          onChange={(e) => setBorrowerName(e.target.value)}
          placeholder="e.g. John Doe"
        />
      </div>

      <div className="form-row">
        <label htmlFor="checkoutDate">Checkout Date</label>
        <input
          id="checkoutDate"
          type="date"
          value={checkoutDate}
          onChange={(e) => setCheckoutDate(e.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Book'}
      </button>
    </form>
  );
}

export default AddBookForm;
