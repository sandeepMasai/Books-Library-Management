const Book = require('../models/Book');

// GET /api/books - Fetch all books
exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

// POST /api/books - Add a new book
exports.createBook = async (req, res, next) => {
  const { title, author, coverImage, availability } = req.body;

  if (!title || !author || !coverImage) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const book = new Book({
      title,
      author,
      coverImage,
      availability: availability ?? true
    });

    await book.save();
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (err) {
    next(err);
  }
};

// PUT /api/books/:id - Update a book
exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.coverImage = req.body.coverImage || book.coverImage;
    book.availability = req.body.availability ?? book.availability;

    const updatedBook = await book.save();
    res.json({ message: 'Book updated successfully', book: updatedBook });
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE /api/books/:id - Delete a book
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    next(err);
  }
};
