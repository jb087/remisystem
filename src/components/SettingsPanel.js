import React, { useContext, useState } from 'react';

import { UserContext } from '../providers/UserProvider';
import useForm from '../hooks/useForm';

export default function SettingsPanel() {
  const {
    user: { userAuth },
  } = useContext(UserContext);
  const [
    emailFields,
    isDuringEmailProcessing,
    onEmailChange,
    setIsDuringEmailProcessing,
  ] = useForm({ email: userAuth.email });

  const updateEmail = async (event, email) => {
    setIsDuringEmailProcessing(true);
    event.preventDefault();
    try {
      await userAuth.updateEmail(email).then(function a() {
        console.log(arguments);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDuringEmailProcessing(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-6">
        <div className="card mb-3">
          <h5 className="card-header">Reminders' Settings</h5>
          <div className="card-body">
            <form>
              <div className="form-group custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="sendEmail"
                />
                <label className="custom-control-label" htmlFor="sendEmail">
                  Remind me by mail
                </label>
              </div>
              {/* TODO: Add spinner, disable fields during fetching */}
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="card mb-3">
          <h5 className="card-header">Change Email</h5>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="email">New email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={emailFields.email}
                  onChange={onEmailChange}
                  disabled={isDuringEmailProcessing}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(event) => updateEmail(event, emailFields.email)}
                disabled={isDuringEmailProcessing}
              >
                {isDuringEmailProcessing ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {' Saving...'}
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="card">
          <h5 className="card-header">Change Password</h5>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="password">New password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
