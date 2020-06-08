import React from 'react';
import './css/Reminder.css';
import { reminderToReadableFormat } from '../utils/reminderUtils';

export default function Reminder({
  reminderData: { id, time },
  onDelete,
  blocked,
  duringAdding,
}) {
  return (
    <div className="reminder text-dark rounded-lg d-flex justify-content-between align-items-center p-1 pl-2 mb-2">
      {reminderToReadableFormat(time)}
      {duringAdding && (
        <span
          className="spinner-border spinner-border-sm mr-3"
          role="status"
          aria-hidden="true"
        ></span>
      )}
      {!duringAdding && (
        <button
          type="button"
          className="btn btn-outline-danger btn-sm reminder__btn"
          onClick={(event) => {
            onDelete(id);
          }}
          disabled={blocked}
        >
          Delete
        </button>
      )}
    </div>
  );
}
