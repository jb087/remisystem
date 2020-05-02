import React from 'react';

import Panel from './Panel';

export default function SettingsPanel() {
  return (
    <Panel>
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <div className="card mb-3">
            <h5 className="card-header">Reminders' Settings</h5>
            <div className="card-body">
              <form>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="sendEmail"
                  />
                  <label className="form-check-label" htmlFor="sendEmail">
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
                    placeholder="Email"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
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
    </Panel>
  );
}
