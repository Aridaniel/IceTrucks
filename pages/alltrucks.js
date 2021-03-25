import { React, useState, useEffect } from 'react';
import Header2 from '../components/Header2';
import styles from '../styles/AllTrucks.module.css';
import Image from 'next/image';
import Link from 'next/link';
import TagList from '../components/TagList';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

function alltrucks({ staticTruck }) {
  const [trucks, setTrucks] = useState(staticTruck);

  return (
    <>
      <div className={styles.container}>
        <div>
          <Header2 />
        </div>

        <div className={styles.listOfAllModals}>
          {trucks.map((truck) => (
            <Link key={truck._id} href={`/truck/${truck._id}`}>
              <a className={styles.truckModul}>
                <Image className={styles.truckImage} src={'/tmpTruck.svg'} width={100} height={100}></Image>
                <div className={styles.textBox}>
                  <h2 className={styles.truckTitle}>{truck.name}</h2>
                  <div className={styles.address}>{truck.address}</div>
                  <div className={styles.allTags}>
                    {truck.tags.map((tag, index) => (
                      <div key={index} className={styles.tag}>
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default alltrucks;

export async function getStaticProps() {
  let staticTruck;
  try {
    const response = await fetch(
      !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/truck'
        : 'https://ice-trucks.herokuapp.com/api/truck'
    );
    const data = await response.json();
    staticTruck = data.data;
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
