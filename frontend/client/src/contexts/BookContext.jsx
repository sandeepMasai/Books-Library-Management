import React from 'react';
import { createContext, useEffect, useState } from 'react';
import api from '../api/axios';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);

  const fetchBooks = async () => {
  try {
    const { data } = await api.get('/books');
    setBooks(data);
  } catch (error) {
    console.error(error); 
  }
};

  const fetchMyBooks = async () => {
    const { data } = await api.get('/mybooks');
    setMyBooks(data);
  };

const addToMyBooks = async (bookId) => {
  try {
    await api.post(`/mybooks/${bookId}`);
  } catch (error) {
    console.error(error);
  }
};
  const updateStatus = async (bookId, status) => {
    await api.patch(`/mybooks/${bookId}/status`, { status });
    fetchMyBooks();
  };

  const updateRating = async (bookId, rating) => {
    await api.patch(`/mybooks/${bookId}/rating`, { rating });
    fetchMyBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, myBooks, fetchMyBooks, addToMyBooks, updateStatus, updateRating }}>
      {children}
    </BookContext.Provider>
  );
};
