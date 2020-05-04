import React, { useState, useEffect } from 'react';
import { getUrl, getRequestInit } from '../helpers/request';

import Tiles from './Tiles';
import useToken from '../hooks/useToken';
import LoadingSpinner from './LoadingSpinner';

export default function Home() {
  const getIdToken = useToken();
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const token = await getIdToken();
        const response = await fetch(
          getUrl('notes-by-user'),
          getRequestInit(token, { method: 'get' })
        );
        const data = await response.json();

        setNotes(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchNotes();
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
