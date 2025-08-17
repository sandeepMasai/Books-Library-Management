const express = require('express');
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public
router.get('/', getAllBooks);

// Admin only
router.post('/', protect, authorizeRoles('admin'), createBook);
router.put('/:id', protect, authorizeRoles('admin'), updateBook);
router.delete('/:id', protect, authorizeRoles('admin'), deleteBook);

module.exports = router;
