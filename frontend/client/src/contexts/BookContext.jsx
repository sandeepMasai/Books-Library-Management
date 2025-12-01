import React from 'react';
import { createContext, useEffect, useState } from 'react';
import api from '../api/axios';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myBooksLoading, setMyBooksLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get('/books');
      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching books:', error);

      // Provide more specific error messages
      if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
        setError('Network error: Unable to connect to server. Please check if the backend is running.');
      } else if (error.response) {
        // Server responded with error status
        setError(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        // Request made but no response received
        setError('No response from server. Please check your connection and ensure the backend is running.');
      } else {
        setError('Failed to fetch books. Please try again.');
      }
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyBooks = async () => {
    try {
      setMyBooksLoading(true);
      const { data } = await api.get('/mybooks');
      setMyBooks(data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching my books:', error);
      setMyBooks([]);
      throw error;
    } finally {
      setMyBooksLoading(false);
    }
  };

  const addToMyBooks = async (bookId) => {
    try {
      await api.post(`/mybooks/${bookId}`);
      // Refresh my books list after adding
      await fetchMyBooks();
      return { success: true };
    } catch (error) {
      console.error('Error adding book to my list:', error);
      throw error;
    }
  };

  const updateStatus = async (bookId, status) => {
    try {
      await api.patch(`/mybooks/${bookId}/status`, { status });
      await fetchMyBooks();
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  };

  const updateRating = async (bookId, rating) => {
    try {
      await api.patch(`/mybooks/${bookId}/rating`, { rating });
      await fetchMyBooks();
    } catch (error) {
      console.error('Error updating rating:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{
      books,
      myBooks,
      loading,
      myBooksLoading,
      error,
      fetchBooks,
      fetchMyBooks,
      addToMyBooks,
      updateStatus,
      updateRating
    }}>
      {children}
    </BookContext.Provider>
  );
};
