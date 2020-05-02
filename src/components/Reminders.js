import React, { useState, useEffect } from 'react';
import './css/Reminders.css';
import { uuidv4 } from '../helpers/uuid';
import useArrayWithFilter from '../hooks/useArrayWithFilter';

import ReminderModal from './ReminderModal';
import Reminder from './Reminder';
import LoadingSpinner from './LoadingSpinner';

export default function Reminders({ noteId, blocked }) {
  const [reminders, addReminder, , setReminders] = useArrayWithFilter(null);
  const [
    remindersDuringAdding,
    addReminderDuringAdding,
    filterRemindersDuringAdding,
    ,
  ] = useArrayWithFilter([]);
  const [showModal, setShowModal] = useState(false);
  const isFetching = reminders === null;

  useEffect(() => {
    setTimeout(() => {
      const reminders = [
        { id: 'i-1', time: 1588602600 * 1000 },
        { id: 'i-2', time: 1588604600 * 1000 },
      ];
      setReminders(reminders);
    }, 2000);
  }, [noteId, setReminders]);

  const onReminderAdd = () => setShowModal(true);
  const onModalClose = () => setShowModal(false);

  const saveReminder = (date) => {
    setShowModal(false);

    const reminder = { id: uuidv4(), time: date.getTime() };
    addReminderDuringAdding(reminder);

    setTimeout(() => {
      const reminderFromBackend = reminder;
      filterRemindersDuringAdding((element) => element.id !== reminder.id);
      addReminder(reminderFromBackend);
    }, 1200);
  };

  const onReminderDelete = (reminderId) => {};

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
          {remindersDuringAdding.map((reminder) => (
            <Reminder
              key={reminder.id}
              reminderData={reminder}
              onDelete={onReminderDelete}
              blocked={blocked}
              duringAdding
            />
          ))}
          <button
            type="button"
            className="btn btn-outline-primary btn-sm w-100 reminders__new-reminder-btn"
            onClick={onReminderAdd}
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
