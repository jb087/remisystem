import React, { useContext, useState } from 'react';

import { UserContext } from '../providers/UserProvider';

export default function SettingsPanel() {
  const { user, userAuth } = useContext(UserContext);
  const [email, setEmail] = useState(user.email);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'email') {
      setEmail(value);
    }
  };

  const updateEmail = async (event, email) => {
    event.preventDefault();
    try {
      userAuth.updateEmail(email).then(function a() {
        console.log(arguments);
      });
    } catch (error) {
      console.error(error);
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
                  value={email}
                  onChange={onChangeHandler}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(event) => updateEmail(event, email)}
              >
                Save
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
