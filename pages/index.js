import Head from 'next/head'
import Map from '../components/Map'
import WrappedMap from '../components/Map';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div >
      <Head>
        <title>Food Trucks Frontpage</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.container}>
        <h1>This shall be our frontpage</h1>
        <h3>Map:</h3>
        <div className={styles.map}>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_MAP_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </main>
    </div>
  );
}
