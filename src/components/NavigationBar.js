import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from './../logo-small.png';
import './css/NavigationBar.css';

import { userContext } from '../App';

export default function NavigationBar() {
  const user = useContext(userContext);

  return (
    <nav className="navbar navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        <img
          src={logo}
          alt="logo"
          className="d-inline-block align-top logo mr-4"
        />
        {user.userData.email}
      </Link>
      <form className="form-inline">
        <Link
          to="/settings"
          className="btn btn-outline-secondary my-2 my-sm-0 mr-2"
          role="button"
        >
          Settings
        </Link>
        <button
          className="btn btn-outline-danger my-2 my-sm-0"
          type="submit"
          onClick={() => user.login(null)}
        >
          Logout
        </button>
      </form>
    </nav>
  );
}
