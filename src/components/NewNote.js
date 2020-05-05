import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { saveNote } from '../services/noteService';

import useForm from '../hooks/useForm';
import useReminders from '../hooks/useReminders';
import useToken from '../hooks/useToken';

import NoteCard from './NoteCard';

export default function NewNote() {
  const getIdToken = useToken();
  const [, newReminders, , addReminder, deleteReminder, ,] = useReminders();
  const [fields, isSaving, onChange, setIsSaving, ,] = useForm({
    title: '',
    description: '',
  });
  const [newNoteId, setNewNoteId] = useState(null);
  const [error, setError] = useState(null);

  const onSave = (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    saveNote(getIdToken, fields.title, fields.description, newReminders)
      .then((newNoteId) => setNewNoteId(newNoteId))
      .catch(() => {
        setError('Error, note has not been saved.');
        setIsSaving(false);
      });
  };

  if (newNoteId) {
    return <Redirect to="/" />;
  }

  return (
    <NoteCard
      cardTitle="New Note"
      allReminders={newReminders}
      title={fields.title}
      description={fields.description}
      onSave={onSave}
      onFormFieldChange={onChange}
      onReminderAdd={addReminder}
      onReminderDelete={deleteReminder}
      isSaving={isSaving}
      isDeleting={false}
      error={error}
    />
  );
}
