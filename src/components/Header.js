// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; 
const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">FairPay</Link>
          {/* <ul className="nav-links"> */}
            {/* <li><Link to="/">Login</Link></li> */}
            {/* <li><Link to="/register">Register</Link></li> */}
            {/* Add more navigation links here */}
          {/* </ul> */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
