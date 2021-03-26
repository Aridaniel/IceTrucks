import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import firebase from 'firebase/app';
import { useAuth } from '../auth';
import 'firebase/auth';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/Login.module.css';

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    router.prefetch('/registertruck');
  }, []);

  const handleLogin = async () => {
    // User already logged in...
    if (user) {
      toast.warn('Already logged in', {
        position: 'bottom-center',
        closeButton: false,
        style: { color: 'black' },
      });
      return;
    }
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push('/registertruck');
      })
      .catch((error) => {
        const message = error.message;
        // console.log('Error: ', message);
        loginAlert(message);
      });
    console.log('Logging in');
  };

  const loginAlert = (error) => {
    toast.warn(error, {
      position: 'bottom-center',
      closeButton: false,
      style: { color: 'black' },
    });
  };

  return (
    <>
      <Link href={'/'}>
        <Image width={40} height={40} classname={styles.logo} src="/whitetrucklogo.svg"></Image>
      </Link>
      <div className={styles.container}>
        <h1 className={styles.title}>Log In</h1>
        <input
          className={styles.input}
          type="email"
          id="emailAddress"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="Email"
        />
        <input
          className={styles.input}
          type="password"
          id="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="Password"
        />
        <button className={styles.btn} type="button" onClick={handleLogin}>
          Log In
        </button>
        <p className={styles.textAccount}>Don't have an account?</p>
        <Link className={styles.linkBtn} href="/signup">
          <a className={styles.linkBtn}>Sign Up here</a>
        </Link>
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar={true}
        />
      </div>
    </>
  );
}
