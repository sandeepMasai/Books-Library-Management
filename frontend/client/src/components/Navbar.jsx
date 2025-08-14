

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">My Library</Link>
      {user ? (
        <>
          <Link to="/mybooks">My Books</Link>
          {user.role === 'admin' && <Link to="/admin">Admin</Link>}
          <button onClick={logout}>Logout</button>
          <span>{user.email}</span>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
