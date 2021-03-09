import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Food Trucks Frontpage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>This shall be our frontpage</h1>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Osom</p>
      </footer>
    </div>
  )
}
