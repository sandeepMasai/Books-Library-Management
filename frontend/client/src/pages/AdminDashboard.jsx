import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import AddBookForm from '../components/AddBookForm';
import EditBookForm from '../components/EditBookForm';

const AdminDashboard = () => {
  const { books, createBook, updateBook, deleteBook } = useContext(AdminContext);
  const [editBook, setEditBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBooks = useMemo(() => {
    return books.slice(startIndex, endIndex);
  }, [books, startIndex, endIndex]);

  // Reset to page 1 when books change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [books.length, currentPage, totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdd = async (bookData) => {
    try {
      await createBook(bookData);
    setShowAddForm(false); 
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  const handleEdit = async (bookData) => {
    try {
      await updateBook(editBook._id, bookData);
    setEditBook(null);
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };

  const handleDelete = async (bookId, title) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (confirmed) {
      setDeleting(bookId);
      try {
        await deleteBook(bookId);
      } catch (error) {
        console.error('Failed to delete book:', error);
        alert('Failed to delete book. Please try again.');
      } finally {
        setDeleting(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your library's book collection</p>
        </div>

      {/* Add Book Button */}
      {!showAddForm && !editBook && (
          <div className="mb-6">
        <button
          onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Book
              </span>
        </button>
          </div>
      )}

      {/* Show Add or Edit form */}
        {(showAddForm || editBook) && (
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
        {showAddForm && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Book</h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <AddBookForm onSubmit={handleAdd} onCancel={() => setShowAddForm(false)} />
              </div>
        )}

        {editBook && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Book</h2>
                  <button
                    onClick={() => setEditBook(null)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <EditBookForm onSubmit={handleEdit} initialData={editBook} onCancel={() => setEditBook(null)} />
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Books Library</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Showing {paginatedBooks.length > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, books.length)} of {books.length} books
                </p>
              </div>
            </div>
      </div>

          {books.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-xl text-gray-600 mb-2">No books in the library</p>
              <p className="text-gray-500">Start by adding your first book!</p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200">
                {paginatedBooks.map((book) => (
                  <div
            key={book._id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h3>
                        <p className="text-gray-600">by {book.author}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            book.availability 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {book.availability ? 'Available' : 'Unavailable'}
                          </span>
                          {book.pdfFile && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                              PDF Available
              </span>
                          )}
                        </div>
            </div>
                      <div className="flex space-x-2">
              <button
                onClick={() => {
                  setEditBook(book);
                  setShowAddForm(false); 
                }}
                          disabled={deleting === book._id}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id, book.title)}
                          disabled={deleting === book._id}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                          {deleting === book._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-gray-700"
                      >
                        Previous
                      </button>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          // Show first page, last page, current page, and pages around current
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-2 min-w-[40px] rounded-lg font-medium transition ${
                                  currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <span key={page} className="px-2 text-gray-500">
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-gray-700"
                      >
                        Next
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
