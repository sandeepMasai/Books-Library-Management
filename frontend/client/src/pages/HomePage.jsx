import { useContext } from 'react';
import { BookContext } from '../contexts/BookContext';
import { AuthContext } from '../contexts/AuthContext';

const HomePage = () => {
  const { books, addToMyBooks } = useContext(BookContext);
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>All Books</h1>
      {books.map(book => (
        <div key={book._id}>
          <img src={book.coverImage} alt={book.title} />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <button onClick={() => user ? addToMyBooks(book._id) : alert('Login required')}>
            Want to Read
          </button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
