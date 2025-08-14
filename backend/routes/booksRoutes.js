

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

// Public for all roles
router.get('/', getAllBooks);

// Admin-only actions
router.post('/api/books', protect, authorizeRoles('admin'), createBook);
router.post('/', protect, authorizeRoles('admin'), createBook);
router.put('/:id', protect, authorizeRoles('admin'), updateBook);
router.delete('/:id', protect, authorizeRoles('admin'), deleteBook);

module.exports = router;
