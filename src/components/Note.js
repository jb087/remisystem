import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import useReminders from '../hooks/useReminders';
import useForm from '../hooks/useForm';

import LoadingSpinner from './LoadingSpinner';
import NoteCard from './NoteCard';

export default function Note() {
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
  const [fields, isSaving, onChange, setIsSaving, ,] = useForm({
    title: '',
    description: '',
  });
  const [isFetching, setIsFetching] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [noteDeleted, setNoteDeleted] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onNoteDelete = () => {
    setIsDeleting(true);

    setError(null);

    setTimeout(() => {
      console.log('deleted');
      setError('Error while deleting note.');
      setIsDeleting(false);
      // setNoteDeleted(true);
    }, 1500);
  };

  const onReminderAdd = (newReminder) => {
    addReminder({ ...newReminder, noteId });
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
      setSuccess('Note has been saved');
      setIsSaving(false);
    }, 1800);
  };

  useEffect(() => {
    async function fetchReminders() {
      setIsFetching(true);
      setError(null);

      setTimeout(() => {
        resetReminders([
          { id: 'i-1', time: 1588602600 * 1000 },
          { id: 'i-2', time: 1588604600 * 1000 },
        ]);
        setIsFetching(false);
        // setError('Error while deleting note.');
        // setNoteDeleted(true);
      }, 1500);
    }

    fetchReminders();
  }, [noteId, resetReminders]);

  if (noteDeleted) {
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
                <div className="row" style={{height: '250px'}}>
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
          onReminderAdd={onReminderAdd}
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
