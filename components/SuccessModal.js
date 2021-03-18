import React from 'react'
import Modal from 'react-modal'
import {useState} from 'react'
import styles from '../styles/SuccessModal.module.css'

function SuccessModal({truck, success, setSuccess}) {
  // opening the 
  function openModal() {
    setSuccess(true);
  }
  // closing the 
  function closeModal() {
    setSuccess(false);
  }
    return (
    <>
        <Modal
            isOpen={success}
            onRequestClose={closeModal}
            contentLabel='Navbar burger menu'
    >
        
            <div className={styles.Container}>
                <div className={styles.Text}>
                    <p>Successfully added:{truck.name}</p>
                </div>
                <button className={styles.button} onClick={closeModal}>OK</button>
            </div>
        </Modal>
    </>     
    )
}

export default SuccessModal
