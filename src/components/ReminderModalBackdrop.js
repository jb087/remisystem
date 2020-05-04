import React from 'react';
import ReactDOM from 'react-dom';

export default function ReminderModalBackdrop({ show }) {
  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-backdrop show"></div>,
    document.getElementById('modal-backdrop')
  );
}
