import React from 'react';
import { Link } from 'react-router-dom';
import './css/NoteTile.css';

export default function NoteTile({ id, title }) {
  return (
    <Link to={`reminder/${id}`}>
      <div className="note-tile">{title}</div>
    </Link>
  );
}
