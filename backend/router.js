const express = require('express');
const router = express.Router();
const { addBook, getAllBooks } = require('./store');
const { getDueDate, calculatePenalty, getStatus } = require('./penalty');


router.post('/books', (req, res)=> {
  const { title, borrowerName, checkoutDate } = req.body ||{};
  if (!title || !borrowerName || !checkoutDate){
    return res.status(400).json({
      error:'title, browserName, and checkoutDate are all required'
    })
}
const parsedDate = new Date(checkoutDate);
if (isNaN(parsedDate.getTime())) {
  return res.status(400).json({ error: 'checkoutDate is not a valid date' });
}

  const book = addBook({ title, borrowerName, checkoutDate });
  res.status(201).json(book);

})


router.get('/books', (req, res)=> {
const books = getAllBooks();

  const enriched = books.map((book) => {
    const dueDate = getDueDate(book.checkoutDate);
    const status = getStatus(dueDate);
    const penalty = calculatePenalty(dueDate);

    return {
      ...book,
      dueDate,
      status,   // 'safe' | 'dueTomorrow' | 'overdue'
      penalty,  // dollar amount, 0 if not overdue
    };
  });

  res.json(enriched);
})
module.exports = router;
