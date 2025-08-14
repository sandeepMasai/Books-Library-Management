import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">My Library</Link>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/mybooks" className="text-gray-700 hover:text-blue-600">
              My Books
            </Link>

            {user.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-blue-600">
                Admin
              </Link>
            )}

            {/* Profile Button */}
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600   px-3 py-1 rounded"
            >
            <span className="text-sm text-gray-600">{user.email}</span>
            </Link>
        
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>

          
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-3 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-50 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
