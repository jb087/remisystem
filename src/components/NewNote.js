import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import LoadingSpinner from './LoadingSpinner';

export default function NewNote() {
  const [newNoteId, setNewNoteId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setNewNoteId('adsfa');
    }, 800);
  }, [setNewNoteId]);

  if (newNoteId) {
    return <Redirect to={`/note/${newNoteId}`} />;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card">
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <h4>Creating new note...</h4>
            <LoadingSpinner />
          </div>
        </div>
      </div>
    </div>
  );
}
