import React from 'react';
import Image from 'next/image';
import Nav from './Nav';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <Image src={'/tmpLogo.svg'} width={24} height={24} />          
      <input type="text" className={styles.truckSearch} placeholder={'Search...'} />
      <Nav />
    </div>
  )
}
