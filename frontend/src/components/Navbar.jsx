/*import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🏥</span>
          AI Health Companion
        </Link>

        <ul className="navbar-menu">
          
        
        
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <span className="user-name">Hi, {user.name}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn btn-login">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;*/


//.........................................






/*import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🏥</span> AI Health Companion
        </Link>

        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>

          {user ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><span className="user-name">Hi, {user.name}</span></li>
              <li>
                <button onClick={handleLogout} className="btn btn-logout">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="btn btn-login">Login</Link></li>
              <li><Link to="/register" className="btn btn-register">Register</Link></li>
            </>
          )}

          
            <button onClick={toggleTheme} className="btn btn-theme">
              {darkMode ? '🌞 Light' : '🌙 Dark'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;*/






//........................




import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🏥</span> AI Health Companion
        </Link>

        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>

          {user ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><span className="user-name">Hi, {user.name}</span></li>
              <li>
                <button onClick={handleLogout} className="btn btn-logout">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="btn btn-login">Login</Link></li>
              <li><Link to="/register" className="btn btn-register">Register</Link></li>
            </>
          )}

          {/* 🌙 Global Theme Toggle Button */}
          <li>
            <button onClick={toggleTheme} className="btn btn-theme">
              {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;




