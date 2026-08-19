let books = []
let nextId = 1;
function addBook({ title, borrowerName, checkoutDate }) {
  const book = {
    id: nextId++,
        title,
        borrowerName,
        checkoutDate,
  }
  books.push(book);
  return book;
}

function getAllBooks() {
  return books;
}

module.exports =
{
  addBook,
  getAllBooks,
  }
