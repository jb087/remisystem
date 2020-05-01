import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import logo from './../logo.png';

import { userContext } from '../App';

export default function Login() {
  const { userData, login } = useContext(userContext);

  if (userData) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <img src={logo} alt="logo" />
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => login({ email: 'asf@as.com' })}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
