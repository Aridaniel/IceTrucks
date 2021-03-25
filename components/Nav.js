import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from '../styles/Nav.module.css';
import Link from 'next/link';
// Using react modal library
import Modal from 'react-modal';
// icon
import { MdClose } from 'react-icons/md';


Modal.setAppElement('body');

export default function Nav({ modalIsOpen, setIsOpen }) {
  //////////////////////////////////
  // logic to open and close the 🍔
  const [currPath, setCurrPath] = useState('');
  
  useEffect(() => {
    const path = window.location.pathname;
    setCurrPath(path)
  }, [])

  // opening the 🍔
  function openModal() {
    setIsOpen(true);
  }
  // closing the 🍔
  function closeModal() {
    setIsOpen(false);
  }
  ////////////////////////////////////
  return (
    <>
      {/* 🍔 icon on the outside */}
      <GiHamburgerMenu className={styles.burger} style={currPath === '/' ? null : {color: 'white'}}  onClick={openModal} />
      {/* Modal component */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Navbar burger menu"
        // custom styles that are in a component below the return statement in this component
        style={customStyles}
      >
        {/* JSX inside the 🍔 */}
        <div className={styles.navContainer}>
          {/* Close button */}

          <div className={styles.buttonContainer}>
              <MdClose className={styles.button} onClick={closeModal} />
          </div>
          <div className={styles.navText}>
            <Link href="/">
              <a>
                <h2>Map</h2>
              </a>
            </Link>
            <Link href="/login">
              <a>
                <h2>Log in</h2>
              </a>
            </Link>
            <Link href="/alltrucks">
              <a>
                <h2>Food Trucks</h2>
              </a>
            </Link>
            <Link href="/registertruck">
              <a>
                <h2>Register Truck</h2>
              </a>
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}

// custom styles for the Modal component
const customStyles = {
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '50%',
    width: '100%',
    border: 'none',
    color: 'white',
    backgroundColor: 'rgb(44, 44, 44)',
  },
};
