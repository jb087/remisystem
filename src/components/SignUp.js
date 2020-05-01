import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PanelUnlogged from './PanelUnlogged';
import { auth, generateUserDocument } from '../firebase';
import { UserContext } from '../providers/UserProvider';

export default function SignUp() {
  const { forceUserAuthUpdate } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (
    event,
    displayName,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      auth.createUserWithEmailAndPassword(email, password).then((userCred) => {
        userCred.user
          .updateProfile({
            displayName,
          })
          .then(() => {
            forceUserAuthUpdate();
          });
      });
      // await generateUserDocument(user, { sendEmailReminders: false });
    } catch (error) {
      setError(error.message);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'displayName') {
      setDisplayName(value);
    }
  };

  return (
    <PanelUnlogged>
      <h5 className="card-header">Sign Up</h5>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form>
          <div className="form-group">
            <label htmlFor="email">Login</label>
            <input
              type="text"
              className="form-control"
              name="displayName"
              id="displayName"
              placeholder="Your displayName"
              value={displayName}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={onChangeHandler}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(event) => {
              createUserWithEmailAndPasswordHandler(
                event,
                displayName,
                email,
                password
              );
            }}
          >
            Sign up
          </button>
        </form>
      </div>
      <div className="card-footer d-flex justify-content-center align-items-center">
        <span>
          Already have an account? <Link to="/signIp">Sign in here</Link>
        </span>
      </div>
    </PanelUnlogged>
  );
}
