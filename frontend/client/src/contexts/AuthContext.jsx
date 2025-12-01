import React from 'react';
import { createContext, useEffect, useState } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const login = async (email, password) => {
    try {
      // Ensure email and password are trimmed
      const trimmedEmail = email?.trim();
      const trimmedPassword = password?.trim();

      if (!trimmedEmail || !trimmedPassword) {
        throw new Error('Email and password are required');
      }

      const { data } = await api.post('/auth/login', { 
        email: trimmedEmail.toLowerCase(), 
        password: trimmedPassword 
      });
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      const { data } = await api.post('/auth/register', formData);
      // After registration, user needs to login
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, getMe }}>
      {children}
    </AuthContext.Provider>
  );
};
