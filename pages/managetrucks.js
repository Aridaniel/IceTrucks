import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllTrucks } from '../lib/trucks';
import Link from 'next/link';
import firebaseClient from '../firebaseClient';
import firebase from 'firebase/app';
import "firebase/auth";
import { verifyIdToken } from '../firebaseAdmin';
import nookies from 'nookies';
import ManageTruckItem from '../components/ManageTruckItem';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/ManageTrucks.module.css';
import { getStaticProps } from './alltrucks';

export default function managetrucks({session, allTrucks}) {
  firebaseClient();
  const [trucks, setTrucks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log('Session: ', session);
    console.log('AlTruc: ', allTrucks);
    // const getData = async () => {
    //   const allTrucks = await getAllTrucks();
    //   setTrucks(allTrucks);
    // }
    // getData();
  }, []);

  // Takes in truck id and new status for the visible attribute
  const updateStatus = async (id, newStatus) => {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken(true);
      const res = await fetch((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:3000/api/updateTruckStatus' : 'https://ice-trucks.herokuapp.com/api/updateTruckStatus', {
        method: 'POST',
        body: JSON.stringify({
          id,
          status: newStatus
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': idToken
        }
      });
      const data = await res.json();
      if(data.msg) {
        console.log('data: ', data);
        return;        
      } else {
        console.log('Truck visible updated id: ', id);
        manageFormSuccess('Trucks status updated');
      }
    } catch(error) {
      manageFormAlert(error);
    }
  }

  const manageFormAlert = (error) => {
    toast.warn(error, {position: 'bottom-center', closeButton: false, style: {color: 'black'}})
  }

  const manageFormSuccess = (msg) => {
    toast.success(msg, {position: 'bottom-center', closeButton: false, style: {color: 'black'}})
  }

  // If session has admin property set to true then display the list
  if(session.admin) {
    return (
      // Todo: merge with ari and get all trucks like he did...
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Manage Trucks</h1>
          <h3>Logged in: {session.name}</h3>
        </div>
        <div className={styles.truckList}>
          {allTrucks ? allTrucks.map((truck, index) => <ManageTruckItem key={index} truck={truck} updateStatus={updateStatus}/>) : 'No trucks to show'}
        </div>
        <Link href={"/"}>Back to frontpage</Link>
        <ToastContainer position="bottom-center" autoClose={2500} hideProgressBar={true}/>
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>No access to this page</h1>
          <Link href={"/"}>Back to frontpage</Link>
        </div>
      </div>
    )
  }
}

// Getting serverside props in order to check cookies?
export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);

    const truckData = await getAllTrucks();
    // console.log('TOKEN: ', token);
    return {
      props: {session: token, allTrucks: truckData}
    }
  } catch(error) {
    // We don't have a cookie and we need them to reauthenticate
    context.res.writeHead(302, {location: "/signup"});
    context.res.end();
    return { props: [] };
  }
}