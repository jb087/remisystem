import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import './css/Note.css';

import Reminders from './Reminders';
import NoteForm from './NoteForm';
import ButtonWithSpinner from './ButtonWithSpinner';

export default function Note() {
  const { noteId } = useParams();
  const [blocked, setBlocked] = useState(false);
  const [noteDeleted, setNoteDeleted] = useState(false);
  const [error, setError] = useState(null);

  if (noteDeleted) {
    return <Redirect to="/" />;
  }

  const deleteNote = () => {
    setBlocked(true);

    setError(null);

    setTimeout(() => {
      console.log('deleted');
      setError('Error while deleting note.');
      setBlocked(false);
      // setNoteDeleted(true);
    }, 1500);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Note</h5>
            <ButtonWithSpinner
              type="button"
              className="btn btn-outline-danger"
              onClick={() => deleteNote()}
              isDuringProcessing={blocked}
              label="Delete whole note"
              labelProcessing="Deleting note..."
            />
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="row">
              <div className="col-sm note__col">
                <NoteForm noteId={noteId} blocked={blocked} />
              </div>
              <div className="col-sm border-left border-fark">
                <Reminders noteId={noteId} blocked={blocked} />
              </div>
            </div>
            <div className="row">
              <div className="col-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
