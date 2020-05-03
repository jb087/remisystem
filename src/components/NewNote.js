import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useForm from '../hooks/useForm';
import useReminders from '../hooks/useReminders';

import NoteCard from './NoteCard';

export default function NewNote() {
  const [
    reminders,
    newReminders,
    deletedRemindersIds,
    addReminder,
    deleteReminder,
    ,
  ] = useReminders();
  const allReminders = [...reminders, ...newReminders];
  const [fields, isSaving, onChange, setIsSaving, ,] = useForm({
    title: '',
    description: '',
  });
  const [newNoteId, setNewNoteId] = useState(null);
  const [error, setError] = useState(null);

  const onReminderAdd = (newReminder) => {
    addReminder({ ...newReminder, noteId: null });
  };

  const onSave = (event) => {
    event.preventDefault();
    setIsSaving(true);

    setError(null);

    console.log(
      fields.title,
      fields.description,
      newReminders,
      deletedRemindersIds
    );
    setTimeout(() => {
      setError('asdf');
      setNewNoteId('asdf-new-123');
    }, 1800);
  };

  if (newNoteId) {
    return <Redirect to={`/note/${newNoteId}`} />;
  }

  return (
    <NoteCard
      cardTitle="New Note"
      allReminders={allReminders}
      title={fields.title}
      description={fields.description}
      onSave={onSave}
      onFormFieldChange={onChange}
      onReminderAdd={onReminderAdd}
      onReminderDelete={deleteReminder}
      isSaving={isSaving}
      isDeleting={false}
      error={error}
    />
  );
}
