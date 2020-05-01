import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import PanelUnlogged from './PanelUnlogged';
import { auth } from '../firebase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError(error.message);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <PanelUnlogged>
      <h5 className="card-header">Sign In</h5>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChangeHandler}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={(event) => signInHandler(event, email, password)}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="card-footer d-flex flex-column justify-content-center align-items-center">
        <span>
          Don't have an account? <Link to="/signUp">Sign up here</Link>
        </span>
        <Link to="/passwordReset">Forgot password?</Link>
      </div>
    </PanelUnlogged>
  );
}
