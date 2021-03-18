import React, {useState} from 'react'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/registertruck.module.css';
import SuccessModal from '../components/SuccessModal'

import { useRouter } from 'next/router'
import { Data } from '@react-google-maps/api';

function registertruck() {

  const [success, setSuccess] = useState(false)
  const [addedTruck, setaddedTruck] = useState(null)

  const [form, setForm] = useState({
  name:'',
  email:'',
  phone:'',
  menu:'',
  description:'',
  location:'',
 })  
 
 

  /* The POST method adds a new entry in the mongodb database. */
  const postTruck = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/truck', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          menu: form.menu,
          description: form.description,
          location: form.location,
         /*  tags:'pizza', */
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json();
      // Throw error with status code in case Fetch API req failed
      if (data.message){
        return;
      }else{
          console.log( 'Seeendin truuuckin', data)
        setaddedTruck(data)
        /* setSuccess(true) */
      }
    } catch (error) {
      console.log('Failed to add TRuck', error)
    }
  }


  const handleChange = (e)=>{
    const value = e.target.value
     setForm({...form, [e.target.name]: value}) 
    
  }

  const clickTag = ()=>{
    console.log('Clikced the TAgs')
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    postTruck()
     
  }

 


   /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
 /*   const formValidate = () => {
    let err = {}
    if (!form.truckname) err.truckname = 'Name is required'
    if (!form.email) err.email = 'Owner is required'
    if (!form.species) err.species = 'Species is required'
    if (!form.image_url) err.image_url = 'Image URL is required'
    return err
  } */

    return (
      <div className={styles.truckForm}>       
        <form    /* action='www.localhost:3000/api' method='POST' */ 
          onSubmit={handleSubmit} 
          className={styles.form}>

            <h1 className={styles.title}>The Trucks Info</h1>
            <Image src='/addphoto.svg'  width='200' height='200'></Image>
            {/* <input 
              name='image_url' 
              
              onChange={handleChange} 
              type='text'  
              placeholder='image_url'
              >
              </input> */}
            <input 
              name='name' 
              maxLength='20'            
              onChange={handleChange} 
              type='text'  
              placeholder='Food Trucks name'
              required
              >
            </input>
            <input 
              name='email'  
              maxLength='30' 
              onChange={handleChange} 
              type='text' 
              placeholder='Contact´s Email'
              required
              >
            </input>
            <input 
              name='phone'
              maxLength='10' 
              onChange={handleChange} 
              type='text' 
              placeholder='Contact´s Phone'
              required
            >
            </input>       
            <input 
              name='menu'
              maxLength='10' 
              onChange={handleChange} 
              type='text' 
              placeholder='Menu'    
            >
            </input>
            <input 
              name='description'
              maxLength='45' 
              onChange={handleChange} 
              type='text' 
              placeholder='Trucks Description'
              required
            ></input>
            <input 
              name='location'
              onChange={handleChange} 
              type='text' 
              placeholder='Location'
            ></input>
            <h3 className={styles.selectTagsTitle}>Select Tags</h3>
            <div className={styles.tagsBtn}>
              <button className={styles.tagBtn} onClick={clickTag}>Pizza</button>
              <button className={styles.tagBtn} onClick={clickTag}>Taco</button>
              <button className={styles.tagBtn} onClick={clickTag}>Burrito</button>
              <button className={styles.tagBtn} onClick={clickTag}>Burrito</button>
              <button className={styles.tagBtn} onClick={clickTag}>Burrito</button>
            </div>
            <button className={styles.submitBtn} type="submit" >Submit</button>   
          </form>

          {!success ? null : <SuccessModal truck={addedTruck} success={success} setSuccess={setSuccess}/>}
      </div>
    );
}

export default registertruck
