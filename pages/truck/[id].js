import React from 'react';
import { getAllTruckIds, getTruckData } from '../../lib/trucks';
import Link from 'next/link';
import styles from '../../styles/TruckDetails.module.css';
import Header2 from '../../components/Header2';

export default function Truck({ truckData }) {
  // console.log(truckData);

  return (
    <>
      {/* <Header2/> */}
      <div className={styles.container}>
        {truckData ? (
          <>
            <Image src="/tmpTruck.svg" width={200} height={200}></Image>
            <h2>{truckData.name}</h2>
            <div>{truckData.address}</div>
            <div>{truckData.phone}</div>
            <div>{truckData.email}</div>
            <div>{truckData.menu}</div>
            <div>{truckData.description}</div>
            <div>{truckData.tags}</div>
            <Link href={'/alltrucks'}>
              <a className={styles.showOmMapBtn}>Show on Map</a>
            </Link>
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
    fallback: false,
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
      truckData,
    },
  };

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
