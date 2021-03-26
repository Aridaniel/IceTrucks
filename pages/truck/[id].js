import React from 'react';
import { getAllTruckIds, getTruckData } from '../../lib/trucks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/TruckDetails.module.css';
import Header2 from '../../components/Header2';
import Image from 'next/image';

export default function Truck({ truckData }) {
  // console.log(truckData);
  const router = useRouter();

  if(router.isFallback) {
    return <div style={{color: 'white'}}>Loading...</div>
  }

  return (
    <>
      <Header2 />
      <div className={styles.container}>
        {truckData ? (
          <>
            
            <Image  src="/tmpTruck.svg"  style={{padding:'1rem'}}width={100} height={80}></Image>
            <div className={styles.textInfoBox}>
              <h2>{truckData.name}</h2>
              <div>Address: {' '} <p className={styles.text}> {truckData.address}</p> </div>
              <div>Phone: {' '} <p className={styles.text}> {truckData.phone}</p></div>
              <div>Email: {' '} <p className={styles.text}> {truckData.email}</p></div>
              <div>Menu: {' '}  <p className={styles.text}> {truckData.menu}</p></div>
              <div>Description: {' '} <p className={styles.text}>{truckData.description}</p></div>
              <div className={styles.truckTags}>
                {truckData.tags.map((tag)=><div key={tag} className={styles.tag}>{tag}</div>)}
              </div>
                <Link href={'/'}>
                <a className={styles.showOmMapBtn}>Show on Map</a>
                </Link>
            </div>
          </>
        ) : (
          <div>No Info</div>
        )}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getAllTruckIds();
  return {
    paths: paths,
    fallback: true,
  };
  // Return a list of possible value for id
  // const data = await fetch(
  //   !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  //     ? 'http://localhost:3000/api/truck'
  //     : 'https://ice-trucks.herokuapp.com/api/truck'
  // );
  // const response = await data.json();
  // const idArray = response.data.map((truck) => {
  //   return {
  //     params: {
  //       id: truck._id,
  //     },
  //   };
  // });
  // return {
  //   paths: idArray,
  //   fallback: false
  // };
}
// Don't fetch directly from getStaticProps?
/* Created a new file in /util/ where we connect to mongodb, then in /lib/trucks we can connect to the db and create functions to 
  for specific data such as a specific trucks data */
export async function getStaticProps({ params }) {
  const truckData = await getTruckData(params.id);
  return {
    props: {
      truckData
    },
    revalidate: 1
  }

  // Fetch necessary data for the blog post using params.id
  // const id = params.id;
  // const data = await fetch(
  //   !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  //     ? `http://localhost:3000/api/truck/${id}`
  //     : `https://ice-trucks.herokuapp.com/api/truck/${id}`
  // );
  // // console.log(`BUILD DATA=======: `, data)
  // const response = await data.json();
  // console.log('RESjson==============: ', response);
  // const truckData = { id, ...response };
  // return {
  //   props: {
  //     truckData
  //   },
  // };
}
