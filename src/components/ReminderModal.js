import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

import ReminderModalBackdrop from './ReminderModalBackdrop';

export default function ReminderModal({ show, onSave, onCancel }) {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <ReminderModalBackdrop show={show} />
      <div
        className={`modal fade ${show ? 'show' : ''}`}
        style={show ? { display: 'block' } : null}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Time</h5>
            </div>
            <div className="modal-body">
              <Flatpickr
                data-enable-time
                value={date}
                onChange={setDate}
                options={{
                  inline: true,
                  minDate: new Date(),
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => onCancel()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onSave(date)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
