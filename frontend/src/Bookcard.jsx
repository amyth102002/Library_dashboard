const STATUS_CONFIG = {
  safe: {
    label: 'Safe',
    className: 'card-safe',
  },
  dueTomorrow: {
    label: 'Due Tomorrow',
    className: 'card-due-tomorrow',
  },
  overdue: {
    label: 'Overdue',
    className: 'card-overdue',
  },
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function BookCard({ book }) {
  const config = STATUS_CONFIG[book.status] || STATUS_CONFIG.safe;

  return (
    <div className={`book-card ${config.className}`}>
      <div className="book-card-header">
        <h3>{book.title}</h3>
        <span className="status-badge">{config.label}</span>
      </div>

      <p className="book-meta">Borrower: {book.borrowerName}</p>
      <p className="book-meta">Checked out: {formatDate(book.checkoutDate)}</p>
      <p className="book-meta">Due: {formatDate(book.dueDate)}</p>

      {book.status === 'overdue' && (
        <p className="penalty-amount">Late fee: ${book.penalty.toFixed(2)}</p>
      )}
    </div>
  );
}

export default BookCard;
