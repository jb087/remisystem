import React from 'react';
import { Link } from 'react-router-dom';
import './css/NoteTile.css';

export default function NoteTile({ id, title, linkTo = `note/${id}` }) {
  return (
    <Link to={linkTo}>
      <div className="note-tile">{title}</div>
    </Link>
  );
}
