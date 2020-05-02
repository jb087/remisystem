import React, { useContext, useState } from 'react';

import ButtonWithSpinner from './ButtonWithSpinner';

import { UserContext } from '../providers/UserProvider';
import useForm from '../hooks/useForm';

export default function SettingsReminder() {
  const {
    user: { userAuth },
  } = useContext(UserContext);
  const [
    fields,
    isDuringProcessing,
    ,
    setIsDuringProcessing,
    onChangeCustom,
  ] = useForm({ sendEmail: false });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const updateReminder = async (event, sendEmail) => {
    event.preventDefault();
    setIsDuringProcessing(true);

    setSuccess(null);
    setError(null);

    try {
      // await userAuth.updateEmail(email);
      console.log(sendEmail);
      setSuccess('Settings have been changed.');
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsDuringProcessing(false);
    }
  };

  return (
    <div className="card mb-3">
      <h5 className="card-header">Reminders' Settings</h5>
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
          <div className="form-group custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="sendEmail"
              name="sendEmail"
              checked={fields.sendEmail}
              onChange={(event) => {
                const { name, checked } = event.target;
                onChangeCustom(name, checked);
              }}
              disabled={isDuringProcessing}
            />
            <label className="custom-control-label" htmlFor="sendEmail">
              Remind me by mail
            </label>
          </div>
          <ButtonWithSpinner
            type="submit"
            className="btn btn-primary"
            onClick={(event) => updateReminder(event, fields.sendEmail)}
            isDuringProcessing={isDuringProcessing}
            label="Save"
            labelProcessing="Saving..."
          />
        </form>
      </div>
    </div>
  );
}
