import { createContext, useEffect, useState } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getMe = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const login = async (email, password) => {
    await api.post('/auth/login', { email, password });
    await getMe();
  };

  const register = async (formData) => {
    await api.post('/auth/register', formData);
    await getMe();
  };

  const logout = async () => {
    await api.get('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
