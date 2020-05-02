import React, { useState, useEffect } from 'react';
import './css/Reminders.css';

import ReminderModal from './ReminderModal';
import Reminder from './Reminder';
import LoadingSpinner from './LoadingSpinner';

export default function Reminders({ noteId, blocked }) {
  const [reminders, setReminders] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const isFetching = reminders === null;

  useEffect(() => {
    setTimeout(() => {
      setReminders([
        { id: 'i-1', time: 1588602600 * 1000 },
        { id: 'i-2', time: 1588604600 * 1000 },
      ]);
    }, 2000);
  }, [noteId, setReminders]);

  const onReminderDelete = () => {};
  const addReminder = () => setShowModal(true);
  const onModalClose = () => setShowModal(false);

  const saveReminder = (date) => {
    setShowModal(false)
    console.log(date)
  };

  return (
    <>
      <div className="mb-2">Reminders</div>
      {isFetching && <LoadingSpinner />}
      {!isFetching && (
        <>
          {reminders.map((reminder) => (
            <Reminder
              key={reminder.id}
              reminderData={reminder}
              onDelete={onReminderDelete}
              blocked={blocked}
            />
          ))}
          <button
            type="button"
            className="btn btn-outline-primary btn-sm w-100 reminders__new-reminder-btn"
            onClick={addReminder}
            disabled={blocked}
          >
            Add new reminder
          </button>
        </>
      )}
      <ReminderModal
        show={showModal}
        onCancel={onModalClose}
        onSave={saveReminder}
      />
    </>
  );
}
