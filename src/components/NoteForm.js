import React from 'react';

export default function NoteForm({ title, description, onChange, blocked }) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          placeholder="Title"
          value={title}
          onChange={onChange}
          disabled={blocked}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          value={description}
          onChange={onChange}
          disabled={blocked}
        />
      </div>
    </form>
  );
}
