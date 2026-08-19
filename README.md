# Library Dashboard

This a mini library project to track borrowed books and calculate late fees automatically. it has a backend (express) and a frontend (react + vite). 


add books that people have borrowed (title, person name, checkout date)
shows all books with due date (7 days from checkout)
tells you if a book is:
    safe (still time left)
    due tomorrow
    overdue
calculates penalty for late returns:
   first 3 days late: $1/day
   after that: $2/day
   max penalty: $15


# project structure

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



### step 1: backend
```bash
cd backend
npm install
npm start
```
server runs on http://localhost:4000


###step 2: front end
open a new terminal tab/window:
```bash
cd frontend
npm install
npm run dev
```



frontend runs on whatever port vite gives u (usually 5173)
###API Endpoints

### POST `/api/books`
add a new borrowed book

body:
```json
{
  "title": "The Great Gatsby",
  "borrowerName": "John Doe",
  "checkoutDate": "2026-08-12"
}
```

returns: 201 with the book object + id

### GET `/api/books`
gets all books with extra info calculated

returns array of:
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

status can be: `safe`, `dueTomorrow`, or `overdue`

---

##  note

- the backend uses in-memory storage (just an array). so if u restart the server, all books are GONE.
- penalty resets every day based on current date. its calculated when u GET the books, not stored.
- checkoutDate uses JS Date parsing so stick to ISO format like `YYYY-MM-DD` to be safe.

---

## AI disclosure

Used ClaudeAI for UI and Deployment Purposes 

