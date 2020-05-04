import React from 'react';
import './css/Tiles.css';

import NoteTile from './NoteTile';

export default function Tiles({ tiles }) {
  const newTileTile = <NoteTile key="-1" title="+" linkTo="newnote" />;

  // TODO: https://medium.com/cloudaper/how-to-create-a-flexible-square-grid-with-css-grid-layout-ea48baf038f3
  return (
    <div className="tiles">
      {newTileTile}
      {tiles.map(({ title, id }) => (
        <NoteTile key={id} id={id} title={title} />
      ))}
    </div>
  );
}
