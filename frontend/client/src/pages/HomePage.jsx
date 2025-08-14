import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../contexts/BookContext';
import BookCard from '../components/BookCard';

const Home = () => {
  const { books } = useContext(BookContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (books) {
      setLoading(false);
    }
  }, [books]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Books</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-600">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
