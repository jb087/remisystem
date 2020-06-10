import React, { useContext, useState } from 'react';

import ButtonWithSpinner from './ButtonWithSpinner';

import { UserContext } from '../providers/UserProvider';
import useForm from '../hooks/useForm';

export default function SettingsPassword() {
  const {
    user: { userAuth },
  } = useContext(UserContext);
  const [
    fields,
    isDuringProcessing,
    onChange,
    setIsDuringProcessing,
  ] = useForm({ password: '' });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const updatePassword = async (event, password) => {
    event.preventDefault();
    setIsDuringProcessing(true);

    setSuccess(null);
    setError(null);

    try {
      await userAuth.updatePassword(password);
      setSuccess('Password has been changed.');
    } catch (passwordUpdateError) {
      setError(passwordUpdateError.message);
      console.error(passwordUpdateError);
    } finally {
      setIsDuringProcessing(false);
    }
  };

  return (
    <div className="card mb-3">
      <h5 className="card-header">Change Password</h5>
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
            <label htmlFor="password">New password</label>
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
            onClick={(event) => updatePassword(event, fields.password)}
            isDuringProcessing={isDuringProcessing}
            label="Save"
            labelProcessing="Saving..."
          />
        </form>
      </div>
    </div>
  );
}
