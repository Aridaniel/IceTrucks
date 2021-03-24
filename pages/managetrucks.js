import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import firebaseClient from '../firebaseClient';
import firebase from 'firebase/app';
import "firebase/auth";
import { verifyIdToken } from '../firebaseAdmin';
import nookies from 'nookies';
import ManageTruckItem from '../components/ManageTruckItem';
import styles from '../styles/ManageTrucks.module.css';


export default function managetrucks({session}) {
  firebaseClient();
  const router = useRouter();

  useEffect(() => {
    console.log('Session: ', session);
  }, [])
  // If session has admin property set to true then display the list
  if(session.admin) {
    return (
      // Todo: merge with ari and get all trucks like he did...
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Manage Trucks</h1>
        </div>
        <div className={styles.truckList}>
          <ManageTruckItem />
        </div>
      </div>
    )
  } else {
    return (
      <div style={{color: 'white'}}>No access</div>
    )
  }
}

// Getting serverside props in order to check cookies?
export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    console.log('verified: ', token);
    // console.log('TOKEN: ', token);
    return {
      props: {session: token}
    }
  } catch(error) {
    // We don't have a cookie and we need them to reauthenticate
    context.res.writeHead(302, {location: "/signup"});
    context.res.end();
    return { props: [] };
  }
}