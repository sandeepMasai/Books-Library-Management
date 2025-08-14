import React, { useState } from 'react';

const AddBookForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [availability, setAvailability] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !coverImage) {
      alert('All fields are required');
      return;
    }

    onSubmit({ title, author, coverImage, availability });

    setTitle('');
    setAuthor('');
    setCoverImage('');
    setAvailability(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Add New Book</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Author
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cover Image URL
        </label>
        <input
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked)}
          id="availability"
          className="accent-green-600 w-4 h-4"
        />
        <label htmlFor="availability" className="text-sm text-gray-700">
          Available
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
