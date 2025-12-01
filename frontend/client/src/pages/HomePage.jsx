import React, { useContext, useEffect, useState, useMemo } from 'react';
import { BookContext } from '../contexts/BookContext';
import { AuthContext } from '../contexts/AuthContext';
import BookCard from '../components/BookCard';

const Home = () => {
  const { books, fetchBooks, loading: booksLoading, error: booksError } = useContext(BookContext);
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch books only on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books based on search and availability
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = 
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesAvailability = 
        filterAvailability === 'all' || 
        (filterAvailability === 'available' && book.availability) ||
        (filterAvailability === 'unavailable' && !book.availability);
      
      return matchesSearch && matchesAvailability;
    });
  }, [books, searchQuery, filterAvailability]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBooks = useMemo(() => {
    return filteredBooks.slice(startIndex, endIndex);
  }, [filteredBooks, startIndex, endIndex]);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterAvailability]);

  // Reset to page 1 if current page is invalid
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredBooks.length, currentPage, totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const availableCount = books.filter(b => b.availability).length;
  const totalCount = books.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-4">
              Welcome to My Library
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover, explore, and manage your favorite books in one place
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-6">
            <div>
              <p className="text-sm text-gray-600">Total Books</p>
              <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">{availableCount}</p>
            </div>
            {user && (
              <div>
                <p className="text-sm text-gray-600">Welcome back!</p>
                <p className="text-lg font-semibold text-blue-600">{user.name}</p>
              </div>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <button
              onClick={() => setFilterAvailability('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterAvailability === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterAvailability('available')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterAvailability === 'available'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setFilterAvailability('unavailable')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterAvailability === 'unavailable'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Unavailable
            </button>
          </div>
        </div>

        {/* Results Count */}
        {(searchQuery || totalPages > 1) && (
          <div className="mb-6">
            <p className="text-gray-600">
              {searchQuery ? (
                <>
                  Found <span className="font-semibold text-gray-900">{filteredBooks.length}</span> book{filteredBooks.length !== 1 ? 's' : ''} 
                  {` for "${searchQuery}"`}
                  {totalPages > 1 && (
                    <span className="ml-2">
                      (Showing {startIndex + 1} - {Math.min(endIndex, filteredBooks.length)})
                    </span>
                  )}
                </>
              ) : (
                totalPages > 1 && (
                  <>
                    Showing <span className="font-semibold text-gray-900">{startIndex + 1} - {Math.min(endIndex, filteredBooks.length)}</span> of {filteredBooks.length} books
                  </>
                )
              )}
            </p>
          </div>
        )}

        {/* Error State */}
        {booksError && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p className="font-medium">Error loading books</p>
            <p className="text-sm">{booksError}</p>
            <button
              onClick={() => fetchBooks()}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {booksLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading books from backend...</p>
            </div>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-xl text-gray-600 mb-2">
              {searchQuery ? 'No books found matching your search' : 'No books found'}
            </p>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? 'Try adjusting your search terms or filters' 
                : 'Check back later for new additions!'}
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterAvailability('all');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-md px-4 py-3 flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-gray-700"
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
                                : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
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
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-gray-700"
                  >
                    Next
                  </button>
                </div>
                <div className="ml-4 text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </>
        )}

        {/* Call to Action for Non-logged in Users */}
        {!user && filteredBooks.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Start Building Your Library</h2>
            <p className="text-blue-100 mb-6">Sign in to add books to your personal collection and track your reading progress</p>
            <a
              href="/login"
              className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              Sign In Now
            </a>
        </div>
      )}
      </div>
    </div>
  );
};

export default Home;
