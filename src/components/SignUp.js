import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import { UserContext } from '../providers/UserProvider';
import useForm from '../hooks/useForm';
import ButtonWithSpinner from './ButtonWithSpinner';

export default function SignUp() {
  const { forceUserAuthUpdate } = useContext(UserContext);
  const [
    fields,
    isDuringProcessing,
    onChange,
    setIsDuringProcessing,
  ] = useForm({ email: '', password: '', displayName: '' });
  const [error, setError] = useState(null);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const createUserWithEmailAndPasswordHandler = async (
    event,
    displayName,
    email,
    password
  ) => {
    event.preventDefault();
    setIsDuringProcessing(true);

    setError(null);

    try {
      const userCred = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await userCred.user.updateProfile({
        displayName,
      });
      forceUserAuthUpdate();
    } catch (error) {
      if (componentIsMounted.current) {
        setError(error.message);
      }
    } finally {
      if (componentIsMounted.current) {
        setIsDuringProcessing(false);
      }
    }
  };

  return (
    <>
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
              placeholder="Your Name"
              value={fields.displayName}
              onChange={onChange}
              disabled={isDuringProcessing}
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
              value={fields.email}
              onChange={onChange}
              disabled={isDuringProcessing}
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
              value={fields.password}
              onChange={onChange}
              disabled={isDuringProcessing}
            />
          </div>
          <ButtonWithSpinner
            type="submit"
            className="btn btn-primary"
            onClick={(event) => {
              createUserWithEmailAndPasswordHandler(
                event,
                fields.displayName,
                fields.email,
                fields.password
              );
            }}
            isDuringProcessing={isDuringProcessing}
            label="Sign un"
            labelProcessing="Signing un..."
          />
        </form>
      </div>
      <div className="card-footer d-flex justify-content-center align-items-center">
        <span>
          Already have an account? <Link to="/signIn">Sign in here</Link>
        </span>
      </div>
    </>
  );
}
