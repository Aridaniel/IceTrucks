import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from '../styles/Nav.module.css';

export default function Nav() {

  const openNav = () => {
    console.log('opening');
  }

  return (
    <GiHamburgerMenu className={styles.burger} onClick={() => openNav()}/>
  )
}
