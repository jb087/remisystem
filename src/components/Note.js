import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { getUrl, getRequestInit } from '../helpers/request';

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
  const [noteDeleted, setNoteDeleted] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onNoteDelete = () => {
    setIsDeleting(true);
    setError(null);
    setSuccess(null);

    async function deleteNote() {
      try {
        const token = await getIdToken();
        await fetch(
          getUrl(`note/${noteId}`),
          getRequestInit(token, {
            method: 'delete',
          })
        );

        setNoteDeleted(true);
      } catch (error) {
        setError('Error, note has not been saved.');
        setIsDeleting(false);
      }
    }
    deleteNote();
  };

  const onSave = (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    async function saveNote() {
      try {
        const token = await getIdToken();
        const noteResponse = fetch(
          getUrl(`note/${noteId}`),
          getRequestInit(token, {
            method: 'put',
            body: JSON.stringify({
              title: fields.title,
              description: fields.description,
            }),
          })
        );
        const deleteRemindersResponses = deletedRemindersIds.map(
          (deletedReminderId) =>
            fetch(
              getUrl(`reminder/${deletedReminderId}`),
              getRequestInit(token, { method: 'delete' })
            )
        );
        const addRemindersResponses = newReminders.map((reminder) =>
          fetch(
            getUrl(`reminder`),
            getRequestInit(token, {
              method: 'post',
              body: JSON.stringify({
                noteId,
                time: reminder.time / 1000,
              }),
            })
          )
        );

        await Promise.all([
          noteResponse,
          ...deleteRemindersResponses,
          ...addRemindersResponses,
        ]);

        setSuccess('Note has been saved');
      } catch (error) {
        setError('Error, note has not been saved.');
      } finally {
        setIsSaving(false);
      }
    }
    saveNote();
  };

  useEffect(() => {
    async function fetchNoteWithReminders() {
      setIsFetching(true);
      setError(null);

      try {
        const token = await getIdToken();
        const noteResponse = fetch(
          getUrl(`note/${noteId}`),
          getRequestInit(token, { method: 'get' })
        );
        const remindersResponse = fetch(
          getUrl(`note/${noteId}/reminders`),
          getRequestInit(token, { method: 'get' })
        );
        const [note, reminders] = await Promise.all([
          noteResponse.then((response) => response.json()),
          remindersResponse.then((response) => response.json()),
        ]);

        onFieldChangeCustom('title', note.title);
        onFieldChangeCustom('description', note.description);
        resetReminders(
          reminders.map((reminder) => ({
            ...reminder,
            time: reminder.time * 1000,
          }))
        );
        setIsFetching(false);
      } catch (error) {
        setError('Error while loading note.');
      } finally {
        setIsFetching(false);
      }
    }
    fetchNoteWithReminders();
  }, [
    noteId,
    getIdToken,
    resetReminders,
    setIsFetching,
    setError,
    onFieldChangeCustom,
  ]);

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
