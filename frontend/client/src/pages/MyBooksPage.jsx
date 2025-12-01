import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../contexts/BookContext';

const StarRating = ({ rating, onChange, disabled = false }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !disabled && onChange(star)}
          disabled={disabled}
          className={`text-2xl transition-all duration-200 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } ${!disabled ? 'hover:text-yellow-500 hover:scale-110 cursor-pointer' : 'cursor-default'}`}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const MyBooksPage = () => {
  const { myBooks, fetchMyBooks, updateStatus, updateRating } = useContext(BookContext);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const [error, setError] = useState(null);

  // Load books only on mount
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        await fetchMyBooks();
      } catch (err) {
        setError('Failed to load your books. Please try again.');
        console.error('Error loading books:', err);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (bookId, newStatus) => {
    setUpdating(prev => ({ ...prev, [`status-${bookId}`]: true }));
    try {
      await updateStatus(bookId, newStatus);
      // BookContext already refreshes the list
    } catch (error) {
      console.error('Failed to update status:', error);
      setError('Failed to update status. Please try again.');
    } finally {
      setUpdating(prev => ({ ...prev, [`status-${bookId}`]: false }));
    }
  };

  const handleRatingChange = async (bookId, newRating) => {
    setUpdating(prev => ({ ...prev, [`rating-${bookId}`]: true }));
    try {
      await updateRating(bookId, newRating);
      // BookContext already refreshes the list
    } catch (error) {
      console.error('Failed to update rating:', error);
      setError('Failed to update rating. Please try again.');
    } finally {
      setUpdating(prev => ({ ...prev, [`rating-${bookId}`]: false }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Want to Read':
        return 'bg-blue-100 text-blue-800';
      case 'Currently Reading':
        return 'bg-yellow-100 text-yellow-800';
      case 'Read':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Books</h1>
          <p className="text-gray-600">
            Manage your reading list and track your progress
            {myBooks.length > 0 && (
              <span className="ml-2 text-blue-600 font-semibold">
                ({myBooks.length} {myBooks.length === 1 ? 'book' : 'books'})
              </span>
            )}
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p className="font-medium">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your books...</p>
            </div>
          </div>
        ) : myBooks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-xl text-gray-600 mb-2">Your reading list is empty</p>
            <p className="text-gray-500 mb-6">Start adding books from the home page!</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
            >
              Browse Books
            </a>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myBooks.map((item) => {
              // Handle both populated and non-populated bookId
              const book = item.bookId?._id ? item.bookId : item.book;
              const bookId = book?._id || item.bookId;
              const status = item.status || 'Want to Read';
              const rating = item.rating || 0;

              if (!book) {
                return null;
              }

              return (
                <div
                  key={bookId}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={book.coverImage || 'https://via.placeholder.com/300x400?text=No+Cover'}
                      alt={book.title || 'Book Cover'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x400?text=No+Cover';
                      }}
                    />
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${getStatusColor(status)}`}>
                      {status}
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{book.title || 'Untitled'}</h3>
                      <p className="text-sm text-gray-600 italic">by {book.author || 'Unknown Author'}</p>
                    </div>

                    {book.pdfFile && (
                      <a
                        href={book.pdfFile}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg text-sm"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Read PDF
                      </a>
                    )}

                    <div className="space-y-3 pt-3 border-t border-gray-200">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                          Reading Status
                        </label>
                        <select
                          value={status}
                          onChange={(e) => handleStatusChange(bookId, e.target.value)}
                          disabled={updating[`status-${bookId}`]}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="Want to Read">Want to Read</option>
                          <option value="Currently Reading">Currently Reading</option>
                          <option value="Read">Read</option>
                        </select>
                        {updating[`status-${bookId}`] && (
                          <p className="text-xs text-blue-600 mt-1">Updating...</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                          Your Rating
                        </label>
                        <StarRating
                          rating={rating}
                          onChange={(newRating) => handleRatingChange(bookId, newRating)}
                          disabled={updating[`rating-${bookId}`]}
                        />
                        {rating > 0 && (
                          <p className="text-xs text-gray-500 mt-1">{rating} out of 5 stars</p>
                        )}
                        {updating[`rating-${bookId}`] && (
                          <p className="text-xs text-blue-600 mt-1">Updating...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooksPage;
