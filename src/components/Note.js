import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import {
  updateNote,
  deleteNote,
  getNoteWithReminders,
} from '../services/noteService';

import useReminders from '../hooks/useReminders';
import useForm from '../hooks/useForm';
import useToken from '../hooks/useToken';

import LoadingSpinner from './LoadingSpinner';
import NoteCard from './NoteCard';

export default function Note() {
  const getIdToken = useToken();
  const { noteId } = useParams();
  const [
    reminders,
    newReminders,
    deletedRemindersIds,
    addReminder,
    deleteReminder,
    resetReminders,
  ] = useReminders();
  const allReminders = [...reminders, ...newReminders];
  const [
    fields,
    isSaving,
    onChange,
    setIsSaving,
    onFieldChangeCustom,
  ] = useForm({
    title: '',
    description: '',
  });
  const [isFetching, setIsFetching] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onNoteDelete = () => {
    setIsDeleting(true);
    setError(null);
    setSuccess(null);

    deleteNote(getIdToken, noteId)
      .then(() => setRedirectToHome(true))
      .catch(() => {
        setError('Error, note has not been saved.');
        setIsDeleting(false);
      });
  };

  const onSave = (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    updateNote(
      getIdToken,
      { noteId, title: fields.title, description: fields.description },
      deletedRemindersIds,
      newReminders
    )
      .then(() => setRedirectToHome(true))
      .catch(() => {
        setError('Error, note has not been saved.');
        setIsSaving(false);
      });
  };

  useEffect(() => {
    setIsFetching(true);
    setError(null);

    getNoteWithReminders(getIdToken, noteId)
      .then(([fetchedNote, fetchedReminders]) => {
        onFieldChangeCustom('title', fetchedNote.title);
        onFieldChangeCustom('description', fetchedNote.description);
        resetReminders(
          fetchedReminders.map((reminder) => ({
            ...reminder,
            time: reminder.time,
          }))
        );
      })
      .catch(() => setError('Error while loading note.'))
      .finally(() => setIsFetching(false));
  }, [
    noteId,
    getIdToken,
    resetReminders,
    setIsFetching,
    setError,
    onFieldChangeCustom,
  ]);

  if (redirectToHome) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {isFetching && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Note</h5>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled
                >
                  Delete whole note
                </button>
              </div>
              <div className="card-body">
                <div className="row" style={{ height: '250px' }}>
                  <LoadingSpinner />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isFetching && (
        <NoteCard
          cardTitle="Note"
          allReminders={allReminders}
          title={fields.title}
          description={fields.description}
          onSave={onSave}
          onFormFieldChange={onChange}
          onReminderAdd={addReminder}
          onReminderDelete={deleteReminder}
          onNoteDelete={onNoteDelete}
          isSaving={isSaving}
          isDeleting={isDeleting}
          error={error}
          success={success}
        />
      )}
    </>
  );
}
