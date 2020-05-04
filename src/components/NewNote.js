import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getUrl, getRequestInit } from '../helpers/request';

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

    async function saveNote() {
      try {
        const token = await getIdToken();
        const response = await fetch(
          getUrl('note-with-reminders'),
          getRequestInit(token, {
            method: 'post',
            body: JSON.stringify({
              note: { title: fields.title, description: fields.description },
              reminders: newReminders.map((reminder) => ({
                time: reminder.time / 1000,
              })),
            }),
          })
        );
        const newNoteId = await response.json();

        setNewNoteId(newNoteId);
      } catch (error) {
        setError('Error, note has not been saved.');
        setIsSaving(false);
      }
    }
    saveNote();
  };

  if (newNoteId) {
    return <Redirect to={`/note/${newNoteId}`} />;
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
