import { useContext, useState } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import AddBookForm from '../components/AddBookForm';
import EditBookForm from '../components/EditBookForm';

const AdminDashboard = () => {
  const { books, createBook, updateBook, deleteBook } = useContext(AdminContext);
  const [editBook, setEditBook] = useState(null);

  const handleAdd = (bookData) => {
    createBook(bookData);
  };

  const handleEdit = (bookData) => {
    updateBook(editBook._id, bookData);
    setEditBook(null);
  };

  const handleDelete = (bookId, title) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (confirmed) {
      deleteBook(bookId);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {editBook ? (
        <EditBookForm onSubmit={handleEdit} initialData={editBook} />
      ) : (
        <AddBookForm onSubmit={handleAdd} />
      )}

      <ul className="mt-6 space-y-2">
        {books.map((book) => (
          <li key={book._id} className="flex justify-between items-center p-2 border rounded">
            <div>
              <strong>{book.title}</strong> by {book.author}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditBook(book)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id, book.title)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
