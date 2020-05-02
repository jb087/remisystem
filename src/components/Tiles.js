import React from 'react';
import './css/Tiles.css';

import ReminderTile from './ReminderTile';

export default function Tiles({ tiles }) {
  const newTileTile = <ReminderTile key="-1" title="+" />;

  // TODO: https://medium.com/cloudaper/how-to-create-a-flexible-square-grid-with-css-grid-layout-ea48baf038f3
  return (
    <div className="tiles">
      {newTileTile}
      {tiles.map(({ title, id }) => (
        <ReminderTile key={id} id={id} title={title} />
      ))}
    </div>
  );
}
