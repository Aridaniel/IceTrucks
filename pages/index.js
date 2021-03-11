import Head from 'next/head'
import Map from '../components/Map';
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
        <div className={styles.mapWrapper}>
          <Map />
        </div>        
      </main>
    </div>
  );
}
