import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import firebaseClient from '../firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';
import styles from '../styles/Signup.module.css';

export default function signup() {
  firebaseClient();
  const router = useRouter();
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let user = firebase.auth().currentUser;
        user
          .updateProfile({ displayName: userName })
          .then(() => {})
          .catch((error) => {
            console.log('UsernameError: ', error);
          });
        router.push('/registertruck');
      })
      .catch((error) => {
        const message = error.message;
        console.log('Error: ', message);
      });
    console.log('Signing up');
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <input
          type='text'
          id='userName'
          placeholder='Username'
          value={userName}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type='email'
          id='emailAddress'
          placeholder='Email'
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type='button' onClick={handleSignup}>
          Sign Up
        </button>
        <p>If you already have an account</p>
        <Link href='/login'>
          <a>Click here</a>
        </Link>
      </div>
    </>
  );
}
