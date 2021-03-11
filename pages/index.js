import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Food Trucks Frontpage</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>This shall be our frontpage</h1>
          <h2>Testing 123</h2>
          <img
            src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.CtxvGcKx6DIzDdajZKJKsgHaEK%26pid%3DApi&f=1'
            alt=''
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Osom</p>
      </footer>
    </div>
  );
}
