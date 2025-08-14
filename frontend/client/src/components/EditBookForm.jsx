import { useEffect, useState } from 'react';

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Edit Book</h2>

      <div>
        <label className="block">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block">Cover Image URL</label>
        <input
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
        Update Book
      </button>
    </form>
  );
};

export default EditBookForm;
