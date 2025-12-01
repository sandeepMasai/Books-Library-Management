import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import { AdminProvider } from './contexts/AdminContext';
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
 <AuthProvider>
   <BookProvider>
    <AdminProvider>
     <BrowserRouter>
       <App />
     </BrowserRouter>
    </AdminProvider>
   </BookProvider>
 </AuthProvider>
)
