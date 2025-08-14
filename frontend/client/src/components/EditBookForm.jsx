import React, { useEffect, useState } from 'react';

const EditBookForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setAuthor(initialData.author || '');
      setCoverImage(initialData.coverImage || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, coverImage });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Edit Book</h2>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Cover Image URL
        </label>
        <input
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-500 text-white font-medium py-2 rounded hover:bg-yellow-600 transition"
      >
        Update Book
      </button>
    </form>
  );
};

export default EditBookForm;
