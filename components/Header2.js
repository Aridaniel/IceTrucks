import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from './Nav';
import styles from '../styles/Header2.module.css';
import Link from 'next/link';
export default function Header2({ truckin }) {
  // logic to open and close the - Modla is closed when state is = false
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currPath, setCurrPath] = useState('');
  
  useEffect(() => {
    const path = window.location.pathname;
    setCurrPath(path)
  }, [])

  /*   const [searchTruck, setSearchTruck] = useState('')

  const handleChange =(e)=>{
    setSearchTerm(e.target.value) 
}*/

  return (
    <>
      <div className={!modalIsOpen ? styles.header : styles.burgerOpen}>
        <Link href={'/'}>
          <h1 className={styles.foodTruckTitle}>Food Truck.is</h1>
        </Link>

        <Nav setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} />
      </div>
      {currPath === '/alltrucks' && 
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.truckSearch}
          placeholder={'Search...'}
          /* onChange={handleChange} */
        />
      </div>
      }
    </>
  );
}
