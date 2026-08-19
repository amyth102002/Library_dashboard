# Library Dashboard

This a mini library project to track borrowed books and calculate late fees automatically. it has a backend (express) and a frontend (react + vite).

## What it does

- Add books that people have borrowed (title, person name, checkout date)
- Shows all books with due date (7 days from checkout)
- Tells you if a book is:
  - safe (still time left)
  - due tomorrow
  - overdue
- Calculates penalty for late returns:
  - first 3 days late: $1/day
  - after that: $2/day
  - max penalty: $15

## Project Structure

```
.mini_library/
├── backend/          # express API server
│   ├── index.js      # server setup
│   ├── router.js     # API routes (add book, get all books)
│   ├── store.js      # in-memory storage (books array, resets when server restarts srry)
│   └── penalty.js    # due date + penalty logic
└── frontend/         # react app with vite
    └── src/
        ├── App.jsx           # main app component
        ├── AddBookForm.jsx   # form to add new book
        ├── Bookcard.jsx      # individual book display card
        └── api.js            # API calls to backend
```

---

## How to run locally

### Step 1: Backend
```bash
cd backend
npm install
npm start
```
Server runs on http://localhost:4000

### Step 2: Front end
Open a new terminal tab/window:
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on whatever port vite gives u (usually 5173)

---

## API Endpoints

### POST `/api/books`
Add a new borrowed book

Body:
```json
{
  "title": "The Great Gatsby",
  "borrowerName": "John Doe",
  "checkoutDate": "2026-08-12"
}
```

Returns: 201 with the book object + id

### GET `/api/books`
Gets all books with extra info calculated

Returns array of:
```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "borrowerName": "John Doe",
  "checkoutDate": "2026-08-12",
  "dueDate": "2026-08-19T00:00:00.000Z",
  "status": "safe",
  "penalty": 0
}
```

Status can be: `safe`, `dueTomorrow`, or `overdue`

---

## Note

- the backend uses in-memory storage (just an array). so if u restart the server, all books are GONE.
- penalty resets every day based on current date. its calculated when u GET the books, not stored.
- checkoutDate uses JS Date parsing so stick to ISO format like `YYYY-MM-DD` to be safe.

---

## AI disclosure

Used ClaudeAI for UI and Deployment Purposes

