import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderLogin.css';

const HeaderLogin = () => {
  return (
    <header className="header-login">
      <nav>
        <Link className="logo" to="/login" aria-label="UrbanisseCMS - Login">
          Urbanisse
        </Link>
      </nav>
    </header>
  );
};

export default HeaderLogin;
