import React, { useContext } from 'react';
import { createContext } from 'react';
import api from '../api/axios';
import { BookContext } from './BookContext';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Use BookContext to share the same books state
  const bookContext = useContext(BookContext);

  const fetchBooks = async () => {
    if (bookContext?.fetchBooks) {
      await bookContext.fetchBooks();
    } else {
      // Fallback: fetch directly if BookContext not available
      const { data } = await api.get('/books');
      return data;
    }
  };

  const createBook = async (bookData) => {
    try {
      await api.post('/books', bookData);
      // Refresh BookContext books so HomePage updates automatically
      if (bookContext?.fetchBooks) {
        await bookContext.fetchBooks();
      }
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  };

  const updateBook = async (id, bookData) => {
    try {
      await api.put(`/books/${id}`, bookData);
      // Refresh BookContext books so HomePage updates automatically
      if (bookContext?.fetchBooks) {
        await bookContext.fetchBooks();
      }
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      // Refresh BookContext books so HomePage updates automatically
      if (bookContext?.fetchBooks) {
        await bookContext.fetchBooks();
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  };

  // Use books from BookContext if available, otherwise empty array
  const books = bookContext?.books || [];

  return (
    <AdminContext.Provider value={{ books, createBook, updateBook, deleteBook, fetchBooks }}>
      {children}
    </AdminContext.Provider>
  );
};
