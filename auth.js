// wrap everything in our app in our auth context to handle all authentications
import firebaseClient from './firebaseClient';
import firebase from 'firebase/app';
import "firebase/auth";
import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  firebaseClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if(!user) {
        setUser(null);
        nookies.set(undefined, "token", "", {path: '/'});
        return;
      }
      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, "token", token, {path: '/'});
    })
  }, []);

  // Everything that's passed in is going to be a child ( the whole application ) will be wrapped with the auth provider
  return (<AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>);
}

export const useAuth = () => useContext(AuthContext);