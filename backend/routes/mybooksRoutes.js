const express = require('express');
const {
  getMyBooks,
  addBookToList,
  updateBookStatus,
  updateBookRating
} = require('../controllers/myBookController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Protect all routes in this router
router.use(protect);

// Routes
router.get('/', getMyBooks); 
router.post('/:bookId', addBookToList);
router.patch('/:bookId/status', updateBookStatus);
router.patch('/:bookId/rating', authorizeRoles('user', 'admin'), updateBookRating);

module.exports = router;
