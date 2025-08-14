import React, { useContext, useState } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import AddBookForm from '../components/AddBookForm';
import EditBookForm from '../components/EditBookForm';

const AdminDashboard = () => {
  const { books, createBook, updateBook, deleteBook } = useContext(AdminContext);
  const [editBook, setEditBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAdd = (bookData) => {
    createBook(bookData);
    setShowAddForm(false); 
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Add Book Button */}
      {!showAddForm && !editBook && (
        <button
          onClick={() => setShowAddForm(true)}
          className="mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          + Add New Book
        </button>
      )}

      {/* Show Add or Edit form */}
      <div className="mb-8">
        {showAddForm && (
          <AddBookForm onSubmit={handleAdd} />
        )}

        {editBook && (
          <EditBookForm onSubmit={handleEdit} initialData={editBook} />
        )}
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">Books List</h2>

      <ul className="space-y-4">
        {books.map((book) => (
          <li
            key={book._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="text-gray-800">
              <strong className="block sm:inline">{book.title}</strong>
              <span className="text-sm text-gray-600 block sm:inline sm:ml-2">
                by {book.author}
              </span>
            </div>
            <div className="mt-2 sm:mt-0 space-x-2">
              <button
                onClick={() => {
                  setEditBook(book);
                  setShowAddForm(false); 
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id, book.title)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
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
