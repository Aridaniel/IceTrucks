import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from '../styles/Nav.module.css';
import Link from 'next/link';
// Using react modal library
import Modal from 'react-modal';
// icon
import { GrClose } from 'react-icons/gr';


Modal.setAppElement('body');

export default function Nav({ modalIsOpen, setIsOpen }) {
  //////////////////////////////////
  // logic to open and close the 🍔

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
      <GiHamburgerMenu className={styles.burger} onClick={openModal} />
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
            <button className={styles.Button} onClick={closeModal}>
              <GrClose onClick={closeModal} />
            </button>
          </div>
          <div className={styles.navText}>
            <Link href="/">
              <a>
                <h1>Map</h1>
              </a>
            </Link>
            <Link href="/login">
              <a>
                <h1>Log in</h1>
              </a>
            </Link>
            <Link href="/alltrucks">
              <a>
                <h1>Food Trucks</h1>
              </a>
            </Link>
            <Link href="/registertruck">
              <a>
                <h1>Register Food Truck</h1>
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
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '100%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    color: 'white',
    backgroundColor: 'rgb(44, 44, 44)',
    
    
    
  },
};
