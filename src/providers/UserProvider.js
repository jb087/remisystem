import React, { createContext, useEffect, useState } from 'react';
import { auth, getUserDocument } from '../firebase';

import useSignIn from '../hooks/useSignIn';

export const UserContext = createContext({});

export default function UserProvider({ children }) {
  const [user, isDuginSignUp, setUser, setIsDuringSignUp] = useSignIn();
  const [isAfterFirstCheck, setIsAfterFirstCheck] = useState(false);
  const [isAfterSecondCheck, setIsAfterSecondCheck] = useState(false);
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      console.log(userAuth, userAuth ? userAuth.uid : 'n');
      setUserAuth(userAuth);
      setIsAfterFirstCheck(true);
    });
  }, [setUserAuth]);

  useEffect(() => {
    if (userAuth && !isDuginSignUp) {
      getUserDocument(userAuth.uid).then((user) => {
        console.log(userAuth.uid, user);
        setUser(user);
        setIsAfterSecondCheck(true);
      });
    } else {
      setUser(null);
      if (isAfterFirstCheck) {
        setIsAfterSecondCheck(true);
      }
    }
  }, [
    isDuginSignUp,
    userAuth,
    setUser,
    isAfterFirstCheck,
    setIsAfterFirstCheck,
    setIsAfterSecondCheck,
  ]);

  return (
    <UserContext.Provider
      value={{ user, userAuth, isDuginSignUp, setIsDuringSignUp }}
    >
      {isAfterSecondCheck ? (
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
