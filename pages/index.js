import Head from 'next/head';
import Map from '../components/Map';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';

export default function Home() {
  return (
    <div >
      <Head>
        <title>Food Trucks Frontpage</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.container}>
        {/* passing in logic for burger nav as prop */}
        <Header />
        <div className={styles.mapWrapper}>
          <Map />
        </div>        
      </main>
    </div>
  );
}
