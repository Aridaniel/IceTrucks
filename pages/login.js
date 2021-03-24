import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import firebaseClient from '../firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';
import styles from '../styles/Login.module.css';

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push('/registertruck');
      })
      .catch((error) => {
        const message = error.message;
        console.log('Error: ', message);
      });
    console.log('Signing up');
  };

  return (
    <div className={styles.container}>
      <h1>Log In</h1>
      <input
        type='email'
        id='emailAddress'
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        placeholder='Email'
      />
      <input
        type='password'
        id='password'
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        placeholder='Password'
      />
      <button type='button' onClick={handleLogin}>
        Log In
      </button>
      <p>Don't have an account?</p>
      <Link href='/signup'>
        <a>Click here</a>
      </Link>
    </div>
  );
}
