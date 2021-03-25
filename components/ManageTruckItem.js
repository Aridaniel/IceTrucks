import React, { useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import styles from '../styles/ManageTruckItem.module.css';

export default function ManageTruckItem({truck, updateStatus}) {
  // const tmpTruck = {name: 'Búlluborgari', email: 'nonni@pizza.com', phone: '9989292'}
  const [currStatus, setCurrStatus] = useState(truck.visible);

  const updateVisibility = () => {
    let newStatus;
    if(currStatus) {
      newStatus = false;
    } else {
      newStatus = true;
    }
    updateStatus(truck._id, newStatus);
    setCurrStatus(!currStatus);
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.infoName}>{truck.name}</div>
        <div>{truck.email}</div>
        <div>{truck.phone}</div>
      </div>
      <div className={styles.controls}>
        <div>
          <input type="checkbox" checked={currStatus} onChange={() => updateVisibility()} className={styles.checkbox}/>
          Show on map
        </div>
        <div className={styles.controlButtons}>
          <FiEdit2 size={24}/>
          <RiDeleteBinLine size={24} />
        </div>
      </div>
    </div>
  )
}
