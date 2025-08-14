const MyBook = require('../models/MyBook');
const Book = require('../models/Book');

// GET /api/mybooks
exports.getMyBooks = async (req, res, next) => {
  try {
    const myBooks = await MyBook.find({ userId: req.user._id }).populate('bookId');
    res.status(200).json(myBooks);
  } catch (err) {
    next(err);
  }
};

// POST /api/mybooks/:bookId
exports.addBookToList = async (req, res, next) => {
  const { bookId } = req.params;

  try {
    const existing = await MyBook.findOne({ userId: req.user._id, bookId });
    if (existing) {
      return res.status(400).json({ message: 'Book already in your list' });
    }

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const myBook = new MyBook({
      userId: req.user._id,
      bookId,
      status: 'Want to Read'
    });

    await myBook.save();
    res.status(201).json({ message: 'Book added to your list', myBook });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/mybooks/:bookId/status
exports.updateBookStatus = async (req, res, next) => {
  const { bookId } = req.params;
  const { status } = req.body;

  const validStatuses = ['Want to Read', 'Currently Reading', 'Read'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const myBook = await MyBook.findOneAndUpdate(
      { userId: req.user._id, bookId },
      { status },
      { new: true }
    );

    if (!myBook) {
      return res.status(404).json({ message: 'Book not in your list' });
    }

    res.status(200).json({ message: 'Status updated', myBook });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/mybooks/:bookId/rating
exports.updateBookRating = async (req, res, next) => {
  const { bookId } = req.params;
  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const myBook = await MyBook.findOneAndUpdate(
      { userId: req.user._id, bookId },
      { rating },
      { new: true }
    );

    if (!myBook) {
      return res.status(404).json({ message: 'Book not in your list' });
    }

    res.status(200).json({ message: 'Rating updated', myBook });
  } catch (err) {
    next(err);
  }
};
