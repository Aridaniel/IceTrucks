import React from 'react'
import styles from '../styles/ManageTruckItem.module.css';

export default function ManageTruckItem() {
  const tmpTruck = {name: 'Búlluborgari', email: 'nonni@pizza.com', phone: '9989292'}
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.infoName}>{tmpTruck.name}</div>
        <div>{tmpTruck.email}</div>
        <div>{tmpTruck.phone}</div>
      </div>
      <div className={styles.controls}>
        <div>
          <input type="checkbox" />
          Show on map
        </div>
        <div>
          <button>Edit</button>
          <button>Del</button>
        </div>
      </div>
    </div>
  )
}
