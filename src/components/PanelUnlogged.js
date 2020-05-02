import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import logo from './../logo.png';

import { UserContext } from '../providers/UserProvider';

export default function PanelUnlogged({ children }) {
  const { user } = useContext(UserContext);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <img src={logo} alt="logo" />
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <div className="card">{children}</div>
        </div>
      </div>
    </div>
  );
}
