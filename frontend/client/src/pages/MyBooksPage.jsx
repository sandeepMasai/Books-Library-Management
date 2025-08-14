import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../contexts/BookContext';

const StarRating = ({ rating, onChange }) => {
  // Render 5 stars; filled or empty depending on rating
  return (
    <div className="flex space-x-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          className={`text-2xl ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-500`}
          role="button"
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const MyBooksPage = () => {
  const { myBooks, fetchMyBooks, updateStatus, updateRating } = useContext(BookContext);

  useEffect(() => {
    fetchMyBooks();
  }, [fetchMyBooks]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Books</h1>

      {myBooks.length === 0 ? (
        <p className="text-center text-gray-600">You have no books in your list.</p>
      ) : (
        <ul className="space-y-6">
          {myBooks.map(({ bookId, status, rating }) => (
            <li
              key={bookId._id}
              className="p-4 border rounded shadow-sm bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{bookId.title}</h3>
                <p className="text-gray-600">by {bookId.author}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="flex flex-col text-gray-700 text-sm">
                  Status:
                  <select
                    value={status}
                    onChange={(e) => updateStatus(bookId._id, e.target.value)}
                    className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Want to Read">Want to Read</option>
                    <option value="Currently Reading">Currently Reading</option>
                    <option value="Read">Read</option>
                  </select>
                </label>

                <label className="flex flex-col text-gray-700 text-sm">
                  Rating:
                  <StarRating
                    rating={rating || 0}
                    onChange={(newRating) => updateRating(bookId._id, newRating)}
                  />
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBooksPage;
