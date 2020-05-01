import React, { createContext, useEffect, useState, useCallback } from 'react';
import { auth, getUserDocument } from '../firebase';

export const UserContext = createContext({});

export default function UserProvider({ children }) {
  const [user, setUser] = useState({ userAuth: null });
  const [isAfterFirstCheck, setIsAfterFirstCheck] = useState(false);
  const forceUserAuthUpdate = useCallback(() => {
    console.log(auth, auth.currentUser);
    setUser({ userAuth: auth.currentUser });
  }, [setUser]);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      console.log(userAuth);
      setUser({ userAuth });
      setIsAfterFirstCheck(true);
    });
  }, [setUser, setIsAfterFirstCheck]);

  return (
    <UserContext.Provider
      value={{
        user: user.userAuth ? user : null,
        forceUserAuthUpdate,
      }}
    >
      {isAfterFirstCheck ? (
        children
      ) : (
        <div
          className="container d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: '100vh' }}
        >
          <div className="row justify-content-center">
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </UserContext.Provider>
  );
}
