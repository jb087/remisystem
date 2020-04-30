import React from 'react';
import ReminderTile from './ReminderTile';

export default function Tiles({ tiles }) {
  const newTileTile = <ReminderTile key="-1" title="+" />

  return (
    <div className="tiles">
      {newTileTile}
      {tiles.map(({ title, id }) => (
        <ReminderTile key={id} title={title} />
      ))}
    </div>
  );
}
