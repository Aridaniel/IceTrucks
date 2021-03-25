import React from 'react'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/SuccessModal.module.css'

Modal.setAppElement('body')
function SuccessModal({truck, success, setSuccess}) {
  const router = useRouter();
  // Closing modal and returning to home route 
  function closeModal() {
    setSuccess(false);
    router.push('/');
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
          <p>You have successfully registered {truck.name}! It is now pending approval to be displayed on the map.</p>
        </div>
        <button className={styles.modalBtn} onClick={() => closeModal()}>OK</button>
      </div>
    </Modal>
  </>     
  )
}

export default SuccessModal
