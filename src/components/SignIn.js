import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import useForm from '../hooks/useForm';
import ButtonWithSpinner from './ButtonWithSpinner';

export default function SignIn() {
  const [
    fields,
    isDuringProcessing,
    onChange,
    setIsDuringProcessing,
  ] = useForm({ email: '', password: '' });
  const [error, setError] = useState(null);

  const signInHandler = (event, email, password) => {
    event.preventDefault();
    setIsDuringProcessing(true);

    setError(null);

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsDuringProcessing(false));
  };

  return (
    <>
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
              value={fields.email}
              onChange={onChange}
              disabled={isDuringProcessing}
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
              value={fields.password}
              onChange={onChange}
              disabled={isDuringProcessing}
            />
          </div>
          <ButtonWithSpinner
            type="submit"
            className="btn btn-primary"
            onClick={(event) =>
              signInHandler(event, fields.email, fields.password)
            }
            isDuringProcessing={isDuringProcessing}
            label="Sign in"
            labelProcessing="Signing in..."
          />
        </form>
      </div>
      <div className="card-footer d-flex flex-column justify-content-center align-items-center">
        <span>
          Don't have an account? <Link to="/signUp">Sign up here</Link>
        </span>
        <Link to="/passwordReset">Forgot password?</Link>
      </div>
    </>
  );
}
