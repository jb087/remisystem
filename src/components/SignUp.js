import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PanelUnlogged from './PanelUnlogged';
import { auth, generateUserDocument } from '../firebase';
import { UserContext } from '../providers/UserProvider';

export default function SignUp() {
  const { setIsDuringSignUp } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (
    event,
    login,
    email,
    password
  ) => {
    setIsDuringSignUp(true);
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await generateUserDocument(user, { login, sendEmailReminders: false });
      // .then(() =>
      // generateUserDocument(user, { login, sendEmailReminders: false })
      // );

      // setEmail('');
      // setPassword('');
      // setLogin('');
      setIsDuringSignUp(false);
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
    } else if (name === 'login') {
      setLogin(value);
    }
  };

  useEffect(() => {
    // setIsDuringSignUp(true);
    // return () => setIsDuringSignUp(false);
  }, [setIsDuringSignUp]);

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
              name="login"
              id="login"
              placeholder="Your login"
              value={login}
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
                login,
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
