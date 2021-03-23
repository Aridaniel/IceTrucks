// wrap everything in our app in our auth context to handle all authentications
import firebaseClient from './firebaseClient';
import firebase from 'firebase/app';
import "firebase/auth";
import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
// import { verifyIdToken } from './firebaseAdmin';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  firebaseClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if(!user) {
        setUser(null);
        nookies.set(undefined, "token", "", {});
        return;
      }
      console.log(`USER: `, user.toJSON())
      const token = await user.getIdToken();
      // verifyIdToken(token).then((claims) => {console.log(claims)});
      setUser(user);
      nookies.set(undefined, "token", token, {});

      firebase.auth().currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        // Confirm the user is an Admin.
        console.log(`Claims`, idTokenResult.claims)
      })
      .catch((error) => {
        console.log(error);
      });
      // check via api route or within client if the user is admin..., MUST also check on server side before executing admin actions
    })
  }, []);

  // Everything that's passed in is going to be a child ( the whole application ) will be wrapped with the auth provider
  return (
    <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);