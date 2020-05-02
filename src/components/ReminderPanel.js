import React from 'react';
import { useParams } from 'react-router-dom';
import './css/ReminderPanel.css';

import Panel from './Panel';

export default function ReminderPanel() {
  let { reminderId } = useParams();
  const { title, description } = {
    title: 'asdfasdf',
    description: 'asdfasfd',
  };

  return (
    <Panel>
      {reminderId}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <h5 className="card-header">Reminder</h5>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Title"
                    defaultValue={title}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    defaultValue={description}
                  />
                </div>
                <div className="reminder-panel__btns">
                  <button
                    type="button"
                    className="btn btn-warning reminder-panel__btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger reminder-panel__btn"
                  >
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary reminder-panel__btn"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
