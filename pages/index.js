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
       
        <Map/>
      </main>
    </div>
  );
}
