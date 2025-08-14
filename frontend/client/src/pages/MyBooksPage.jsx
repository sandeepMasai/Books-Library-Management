import { useContext, useEffect } from 'react';
import { BookContext } from '../contexts/BookContext';

const MyBooksPage = () => {
  const { myBooks, fetchMyBooks, updateStatus, updateRating } = useContext(BookContext);

  useEffect(() => {
    fetchMyBooks();
  }, []);

  return (
    <div>
      <h1>My Books</h1>
      {myBooks.map(item => (
        <div key={item.bookId._id}>
          <h3>{item.bookId.title}</h3>
          <select value={item.status} onChange={e => updateStatus(item.bookId._id, e.target.value)}>
            <option>Want to Read</option>
            <option>Currently Reading</option>
            <option>Read</option>
          </select>
          <input
            type="number"
            value={item.rating || ''}
            onChange={e => updateRating(item.bookId._id, Number(e.target.value))}
            min="1"
            max="5"
          />
        </div>
      ))}
    </div>
  );
};

export default MyBooksPage;
