import Head from 'next/head';
import Map from '../components/Map';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';

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
