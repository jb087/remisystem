import React, { useContext } from 'react';

import { userContext } from '../App';

import logo from './../logo.png';
import { Redirect } from 'react-router-dom';

export default function Login() {
  const user = useContext(userContext);

  console.log(user, user.userData);
  if (user.userData) {
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
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => user.login({ email: 'asf@as.com' })}
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
