import React from 'react';
import './css/Reminder.css';

export default function Reminder({ reminderData: { id, time }, onDelete, blocked }) {
  return (
    <div className="reminder text-dark rounded-lg d-flex justify-content-between align-items-center p-1 pl-2 mb-2">
      {new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date(time))}
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
    </div>
  );
}
