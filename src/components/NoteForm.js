import React, { useEffect, useState } from 'react';
import useForm from '../hooks/useForm';

import LoadingSpinner from './LoadingSpinner';
import ButtonWithSpinner from './ButtonWithSpinner';

export default function NoteForm({ noteId, blocked }) {
  const [note, setNote] = useState(null);
  const isFetching = note === null;
  const [
    fields,
    isDuringProcessing,
    onChange,
    setIsDuringProcessing,
    onChangeCustom,
  ] = useForm({ title: '', description: '' });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setNote({ title: 'asdfasdf', description: 'asdfasfd' });
    }, 1500);
  }, [noteId, setNote]);

  useEffect(() => {
    onChangeCustom('title', note ? note.title : '');
    onChangeCustom('description', note ? note.description : '');
  }, [onChangeCustom, note]);

  const saveHandler = (event, title, description) => {
    event.preventDefault();
    setIsDuringProcessing(true);

    setError(null);
    setSuccess(null);

    setTimeout(() => {
      setError('asdf');
      setSuccess('asdf2');
      setIsDuringProcessing(false);
    }, 1800);
  };

  return (
    <>
      {isFetching && <LoadingSpinner />}
      {!isFetching && (
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Title"
              value={fields.title}
              onChange={onChange}
              disabled={isDuringProcessing || blocked}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={fields.description}
              onChange={onChange}
              disabled={isDuringProcessing || blocked}
            />
          </div>
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <ButtonWithSpinner
            type="submit"
            className="btn btn-outline-primary"
            onClick={(event) =>
              saveHandler(event, fields.email, fields.password)
            }
            isDuringProcessing={isDuringProcessing}
            disabled={blocked}
            label="Save"
            labelProcessing="Saving..."
          />
        </form>
      )}
    </>
  );
}
