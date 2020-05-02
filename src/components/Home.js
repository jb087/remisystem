import React from 'react';

import Tiles from './Tiles';

export default function Home() {
  const tiles = [
    { title: 'Tile 1', id: 'asdfasdf-1' },
    { title: 'Tile 2', id: 2 },
    { title: 'Tile 3', id: 3 },
    { title: 'Some very very long time tile 1', id: 4 },
  ];

  return (
    <div className="row justify-content-center">
      <div className="col-10">
        <Tiles tiles={tiles} />
      </div>
    </div>
  );
}
