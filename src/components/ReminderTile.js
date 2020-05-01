import React from 'react';
import { Link } from 'react-router-dom';
import './css/ReminderTile.css';

export default function ReminderTile({ id, title }) {
  return (
    <Link to={`reminder/${id}`}>
      <div className="reminder-tile">{title}</div>
    </Link>
  );
}
