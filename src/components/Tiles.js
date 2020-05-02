import React from 'react';
import './css/Tiles.css';

import ReminderTile from './ReminderTile';

export default function Tiles({ tiles }) {
  const newTileTile = <ReminderTile key="-1" title="+" />;

  return (
    <div className="tiles">
      {newTileTile}
      {tiles.map(({ title, id }) => (
        <ReminderTile key={id} id={id} title={title} />
      ))}
    </div>
  );
}
