import React, { useContext } from 'react';
import { BookContext } from '../contexts/BookContext';
import { AuthContext } from '../contexts/AuthContext';

const BookCard = ({ book }) => {
  const { addToMyBooks } = useContext(BookContext);
  const { user } = useContext(AuthContext);

  const handleAdd = () => {
    if (!user) {
      alert('Please login to add books to your list');
      return;
    }
    addToMyBooks(book._id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition duration-200 space-y-3">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
      <p className="text-sm text-gray-600 italic">by {book.author}</p>

      {book.pdfFile && (
        <a
          href={`http://localhost:2025${book.pdfFile}#toolbar=0`}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-sm text-blue-600 hover:text-blue-800 underline transition"
        >
          Preview PDF
        </a>
      )}

      <button
        onClick={handleAdd}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
      >
        Want to Read
      </button>
    </div>
  );
};

export default BookCard;
