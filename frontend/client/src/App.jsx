import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MyBooksPage from './pages/MyBooksPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import MyBooks from './pages/MyBooksPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <>
       
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mybooks" element={<MyBooksPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

             <Route element={<ProtectedRoute />}>
              <Route path="/mybooks" element={<MyBooks />} />
               <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<h2>Page Not Found</h2>} />

          </Routes>
        </>
      
  );
}

export default App;
