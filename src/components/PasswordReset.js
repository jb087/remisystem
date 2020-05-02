import React, { useState } from 'react';

import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import ButtonWithSpinner from './ButtonWithSpinner';
import useForm from '../hooks/useForm';

export default function PasswordReset() {
  const [
    fields,
    isDuringProcessing,
    onChange,
    setIsDuringProcessing,
  ] = useForm({ email: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const resetHandler = (event, email) => {
    event.preventDefault();
    setIsDuringProcessing(true);

    setSuccess(null);
    setError(null);

    auth
      .sendPasswordResetEmail(email)
      .then(() => setSuccess('Reset email has been sent.'))
      .catch((error) => setError(error.message))
      .finally(() => setIsDuringProcessing(false));
  };

  return (
    <>
      <h5 className="card-header">Reset Password</h5>
      <div className="card-body">
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
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
              value={fields.email}
              onChange={onChange}
              disabled={isDuringProcessing}
            />
          </div>
          <ButtonWithSpinner
            type="submit"
            className="btn btn-primary"
            onClick={(event) => resetHandler(event, fields.email)}
            isDuringProcessing={isDuringProcessing}
            label="Send reset email"
            labelProcessing="Sending email..."
          />
        </form>
      </div>
      <div className="card-footer d-flex flex-column justify-content-center align-items-center">
        <Link to="/signIp">Go back to Sign In</Link>
      </div>
    </>
  );
}
