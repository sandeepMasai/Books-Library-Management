import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import MyBooksPage from './pages/MyBooksPage';
import ProfilePage from './pages/ProfilePage';
import PDFReaderPage from './pages/PDFReaderPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/read/:bookId" element={<PDFReaderPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/mybooks" element={<MyBooksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
              <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                Return to Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </>
  );
}

export default App;
