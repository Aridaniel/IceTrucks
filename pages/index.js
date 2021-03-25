import React, { useState } from 'react';
import Head from 'next/head';
import Map from '../components/Map';
import { getAllTrucks } from '../lib/trucks';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';

export default function Home({ staticTruck }) {
  return (
    <div>
      <Head>
        <title>Food Trucks Frontpage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        {/* passing in logic for burger nav as prop */}
        <Header />
        <div className={styles.mapWrapper}>
          <Map staticTruck={staticTruck} />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  let staticTruck;
  try {
    staticTruck = await getAllTrucks();
  } catch (error) {
    console.log('Error: ', error);
  }
  return {
    props: {
      staticTruck,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 5, // In seconds
  };
}
