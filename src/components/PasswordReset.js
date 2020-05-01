import React, { useState } from 'react';

import { auth } from '../firebase';
import PanelUnlogged from './PanelUnlogged';
import { Link } from 'react-router-dom';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const resetHandler = (event, email) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'email') {
      setEmail(value);
    }
  };

  return (
    <PanelUnlogged>
      <h5 className="card-header">Reset Password</h5>
      <div className="card-body">
        {emailSent && (
          <div className="alert alert-success" role="alert">
            Reset email has been sent.
          </div>
        )}
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
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(event) => resetHandler(event, email)}
          >
            Send rest email
          </button>
        </form>
      </div>
      <div className="card-footer d-flex flex-column justify-content-center align-items-center">
        <Link to="/signIp">Go back to Sign In</Link>
      </div>
    </PanelUnlogged>
  );
}
