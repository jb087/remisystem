import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import NavigationBar from './NavigationBar';

import { UserContext } from '../providers/UserProvider';

export default function Panel({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/signIn" />;
  }

  return (
    <>
      <NavigationBar />
      <div className="container">{children}</div>
    </>
  );
}
