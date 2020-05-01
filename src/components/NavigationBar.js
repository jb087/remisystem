import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from './../logo-small.png';
import './css/NavigationBar.css';

import { UserContext } from '../providers/UserProvider';
import { auth } from '../firebase';

export default function NavigationBar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        <img
          src={logo}
          alt="logo"
          className="d-inline-block align-top logo mr-4"
        />
        {user.login}
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
          type="button"
          onClick={() => {
            auth.signOut();
            // .then(function () {
            //   setUser(null)
            // })
            // .catch(function (error) {
            //   // An error happened
            // })
          }}
        >
          Logout
        </button>
      </form>
    </nav>
  );
}
