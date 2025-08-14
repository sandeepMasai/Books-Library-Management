import { useState } from 'react';

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

    // Send data with availability
    onSubmit({ title, author, coverImage, availability });

    // Clear form
    setTitle('');
    setAuthor('');
    setCoverImage('');
    setAvailability(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Add New Book</h2>

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

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked)}
          id="availability"
        />
        <label htmlFor="availability">Available</label>
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
