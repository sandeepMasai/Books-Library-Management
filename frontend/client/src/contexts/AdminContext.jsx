import React from 'react';
import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const { data } = await api.get('/books');
    setBooks(data);
  };

  const createBook = async (bookData) => {
    await api.post('/books', bookData);
    fetchBooks();
  };

  const updateBook = async (id, bookData) => {
    await api.put(`/books/${id}`, bookData);
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await api.delete(`/books/${id}`);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <AdminContext.Provider value={{ books, createBook, updateBook, deleteBook }}>
      {children}
    </AdminContext.Provider>
  );
};
