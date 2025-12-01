import React, { useContext, useState } from 'react';
import { BookContext } from '../contexts/BookContext';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const { addToMyBooks } = useContext(BookContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State for add button
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // State for image loading
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const defaultImage = 'https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=' + encodeURIComponent(book.title || 'Book Cover');

  const handleAdd = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      await addToMyBooks(book._id);
      setMessage('Added to your list!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to add book');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 transform hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
        <img
          src={imageError ? defaultImage : (book.coverImage || defaultImage)}
          alt={book.title}
          className={`w-full h-64 object-cover rounded-lg transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          onError={(e) => {
            if (!imageError) {
              setImageError(true);
              setImageLoading(false);
              e.target.src = defaultImage;
            }
          }}
          onLoad={() => setImageLoading(false)}
        />
        {!book.availability && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold shadow-md">
            Unavailable
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900 line-clamp-2">{book.title}</h2>
        <p className="text-sm text-gray-600 italic">by {book.author}</p>
      </div>

      <div className="space-y-2">
        {/* Read PDF Button - Only for logged-in users */}
        {user && book.pdfFile && (
          <a
            href={book.pdfFile}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Read PDF
          </a>
        )}

        {/* Add to My Books Button - Only for logged-in users */}
        {user ? (
          <button
            onClick={handleAdd}
            disabled={loading || !book.availability}
            className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              loading || !book.availability
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : message ? (
              <span className="text-green-600">✓ {message}</span>
            ) : (
              'Add to My Books'
            )}
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            disabled={!book.availability}
            className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              !book.availability
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login to Add Book
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
