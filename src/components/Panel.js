import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import NavigationBar from './NavigationBar';

import { userContext } from '../App';

export default function Panel({ children }) {
  const { userData } = useContext(userContext);

  if (!userData) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <NavigationBar />
      <div className="container">{children}</div>
    </>
  );
}
