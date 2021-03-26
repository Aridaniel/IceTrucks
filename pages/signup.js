import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import firebaseClient from '../firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/Signup.module.css';

export default function signup() {
  firebaseClient();
  const router = useRouter();
  const { user } = useAuth();
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    router.prefetch('/registertruck');
  }, []);

  const handleSignup = async () => {
    // User already logged in
    if (user) {
      signUpAlert('Already logged in');
      return;
    }
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        let user = firebase.auth().currentUser;
        // How to declare a user as admin?
        user
          .updateProfile({ displayName: userName })
          .then(() => {})
          .catch((error) => {
            console.log('UsernameError: ', error);
          });
        await user.reload();
        router.push('/registertruck');
      })
      .catch((error) => {
        const message = error.message;
        // console.log('Error: ', message);
        signUpAlert(message);
      });
    console.log('Signing up');
  };

  const signUpAlert = (error) => {
    toast.warn(error, {
      position: 'bottom-center',
      closeButton: false,
      style: { color: 'black' },
    });
  };

  return (
    <>
      <Link href={'/'}>
        <Image
          width={40}
          height={40}
          classname={styles.logo}
          src="/whitetrucklogo.svg"
        ></Image>
      </Link>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 >Sign Up</h1>
        </div>
        <input
          className={styles.input}
          type="text"
          id="userName"
          placeholder="Username"
          value={userName}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
        className={styles.input}
          type="email"
          id="emailAddress"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
        className={styles.input}
          type="password"
          id="password"
          placeholder="Password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="button" onClick={handleSignup}>
          Sign Up
        </button>
        <p className={styles.text}>If you already have an account</p>
        <Link href="/login">
          <a className={styles.loginBtn}>Log In here</a>
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
