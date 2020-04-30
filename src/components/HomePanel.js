import React, { useContext } from 'react';

import { userContext } from '../App';
import NavigationBar from './NavigationBar';
import { Redirect } from 'react-router-dom';
import Tiles from './Tiles';

export default function HomePanel() {
  const user = useContext(userContext);
  const tiles = [
    { title: 'Tile 1', id: 1 },
    { title: 'Tile 2', id: 2 },
    { title: 'Tile 3', id: 3 },
    { title: 'Tile 4', id: 4 },
  ];

  if (!user.userData) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <NavigationBar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <Tiles tiles={tiles} />
          </div>
        </div>
      </div>
    </>
  );
}
