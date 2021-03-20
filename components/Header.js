import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Nav from './Nav';
import styles from '../styles/Header.module.css';

export default function Header() {
  // logic to open and close the 🍔
  // 🍔 closed = false
  const [modalIsOpen, setIsOpen] = useState(false);
  return (
    // if burger is closed, display flex💪 else display none✂
    <div className={!modalIsOpen ? styles.header : styles.burgerOpen}>
      <Image src={'/tmpLogo.svg'} width={24} height={24} />
      <input
        type='text'
        className={styles.truckSearch}
        placeholder={'Search...'}
      />
      {/* passing in logic for burger nav as prop */}
      <Nav setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} />
    </div>
  );
}
