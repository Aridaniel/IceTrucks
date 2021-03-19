import React from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/SuccessModal.module.css'

Modal.setAppElement('body')
function SuccessModal({truck, success, setSuccess}) {
  // Closing modal and returning to home route 
  function closeModal() {
    setSuccess(false);
    window.location.href = "/";
  }

  return (
  <>
    <Modal
      isOpen={success}
      onRequestClose={closeModal}
      contentLabel='Successfull truck registration'
      className={styles.modalContainer}
    >
      <div className={styles.modalContent}>
        <div className={styles.truckInfo}>
          <Image src="/tmpTruck.svg" alt="Truck added" width={200} height={200} />
          <h2>Success!</h2>
          <p>You have successfully registered {truck.name}</p>
        </div>
        <Link href="/">
          <a className={styles.modalBtn}>OK</a>
        </Link>
      </div>
    </Modal>
  </>     
  )
}

export default SuccessModal
