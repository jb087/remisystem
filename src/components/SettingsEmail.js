import React, { useContext, useState } from 'react';

import ButtonWithSpinner from './ButtonWithSpinner';

import { UserContext } from '../providers/UserProvider';
import useForm from '../hooks/useForm';

export default function SettingsEmail() {
  const {
    user: { userAuth },
  } = useContext(UserContext);
  const [
    fields,
    isDuringProcessing,
    onChange,
    setIsDuringProcessing,
  ] = useForm({ email: userAuth.email });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const updateEmail = async (event, email) => {
    event.preventDefault();
    setIsDuringProcessing(true);

    setSuccess(null);
    setError(null);

    try {
      await userAuth.updateEmail(email);
      setSuccess('Email has been changed.');
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsDuringProcessing(false);
    }
  };

  return (
    <div className="card mb-3">
      <h5 className="card-header">Change Email</h5>
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
            <label htmlFor="email">New email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={fields.email}
              onChange={onChange}
              disabled={isDuringProcessing}
            />
          </div>
          <ButtonWithSpinner
            type="submit"
            className="btn btn-primary"
            onClick={(event) => updateEmail(event, fields.email)}
            isDuringProcessing={isDuringProcessing}
            label="Save"
            labelProcessing="Saving..."
          />
        </form>
      </div>
    </div>
  );
}
