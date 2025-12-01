import React, { useState } from 'react';

const AddBookForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [pdfFile, setPdfFile] = useState('');
  const [availability, setAvailability] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !author || !coverImage) {
      setError('Title, Author, and Cover Image are required');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ title, author, coverImage, pdfFile, availability });
      setTitle('');
      setAuthor('');
      setCoverImage('');
      setPdfFile('');
      setAvailability(true);
    } catch (err) {
      setError('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Book Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Author *
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Cover Image URL *
        </label>
        <input
          type="url"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://example.com/book-cover.jpg"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
        />
        <p className="mt-1 text-xs text-gray-500">Enter a valid image URL</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          PDF File URL (Optional)
        </label>
        <input
          type="url"
          value={pdfFile}
          onChange={(e) => setPdfFile(e.target.value)}
          placeholder="https://example.com/book.pdf"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
        />
        <p className="mt-1 text-xs text-gray-500">Enter PDF URL for reading online</p>
      </div>

      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked)}
          id="availability"
          className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
        />
        <label htmlFor="availability" className="text-sm font-medium text-gray-700 cursor-pointer">
          Book is available for borrowing
        </label>
      </div>

      <div className="flex space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md"
        >
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </div>
    </form>
  );
};

export default AddBookForm;
