import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './css/Reminders.css';

import ReminderModal from './ReminderModal';
import Reminder from './Reminder';

export default function Reminders({
  reminders,
  addReminder,
  deleteReminder,
  blocked,
}) {
  const [showModal, setShowModal] = useState(false);

  const onModalShow = () => setShowModal(true);
  const onModalCancel = () => setShowModal(false);
  const onModalSave = (date) => {
    setShowModal(false);
    addReminder({ id: uuidv4(), time: date });
  };

  return (
    <>
      <div className="mb-2">Reminders</div>
      {reminders.map((reminder) => (
        <Reminder
          key={reminder.id}
          reminderData={reminder}
          onDelete={deleteReminder}
          blocked={blocked}
        />
      ))}
      <button
        type="button"
        className="btn btn-outline-primary btn-sm w-100 reminders__new-reminder-btn"
        onClick={onModalShow}
        disabled={blocked}
      >
        Add new reminder
      </button>
      <ReminderModal
        show={showModal}
        onCancel={onModalCancel}
        onSave={onModalSave}
      />
    </>
  );
}
