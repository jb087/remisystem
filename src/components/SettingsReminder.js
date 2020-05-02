import React, { useContext, useState, useEffect } from 'react';

import ButtonWithSpinner from './ButtonWithSpinner';

import { UserContext } from '../providers/UserProvider';
import useForm from '../hooks/useForm';
import { getOrCreateSettings, setUserSettings } from '../firebase';

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
  ] = useForm({ sendEmailReminders: false });
  const [settings, setSettings] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const uid = userAuth.uid;
  const isFetchingData = !settings;

  useEffect(() => {
    async function fetchSettings() {
      const userSettings = await getOrCreateSettings(uid);
      setSettings(userSettings);
    }
    fetchSettings();
  }, [uid, setSettings]);

  useEffect(() => {
    if (settings) {
      onChangeCustom('sendEmailReminders', settings.sendEmailReminders);
    }
  }, [settings, onChangeCustom]);

  const updateReminder = async (event, sendEmailReminders) => {
    event.preventDefault();
    setIsDuringProcessing(true);

    setSuccess(null);
    setError(null);

    try {
      await setUserSettings(uid, { sendEmailReminders });
      setSuccess('Settings have been changed.');
    } catch (error) {
      setError(error.message);
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
        {isFetchingData && (
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {!isFetchingData && (
          <form>
            <div className="form-group custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="sendEmailReminders"
                name="sendEmailReminders"
                checked={fields.sendEmailReminders}
                onChange={(event) => {
                  const { name, checked } = event.target;
                  onChangeCustom(name, checked);
                }}
                disabled={isDuringProcessing}
              />
              <label
                className="custom-control-label"
                htmlFor="sendEmailReminders"
              >
                Remind me by mail
              </label>
            </div>
            <ButtonWithSpinner
              type="submit"
              className="btn btn-primary"
              onClick={(event) =>
                updateReminder(event, fields.sendEmailReminders)
              }
              isDuringProcessing={isDuringProcessing}
              label="Save"
              labelProcessing="Saving..."
            />
          </form>
        )}
      </div>
    </div>
  );
}
