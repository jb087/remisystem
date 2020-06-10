import React, { useState, useEffect } from 'react';
import { getNotesByUser } from '../services/noteService';

import Tiles from './Tiles';
import useToken from '../hooks/useToken';
import LoadingSpinner from './LoadingSpinner';

export default function Home() {
  const getIdToken = useToken();
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    getNotesByUser(getIdToken)
      .then((fetchedNotes) => setNotes(fetchedNotes))
      .catch((error) => console.error(error));
  }, [setNotes, getIdToken]);

  return (
    <>
      {!notes && <LoadingSpinner />}
      {notes && (
        <div className="row justify-content-center">
          <div className="col-10">
            <Tiles tiles={notes} />
          </div>
        </div>
      )}
    </>
  );
}
