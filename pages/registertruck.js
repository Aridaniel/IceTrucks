import React from 'react'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/registertruck.module.css';

import { useRouter } from 'next/router'

function registertruck() {

  const router = useRouter()
 /*   const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
 */
 /* const [form, setForm] = useState({
   truckname = '',
   email: '',
   phone:'',
   description:'',
    location: '',

 })  */

 
  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('www.localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/')
    } catch (error) {
      alert('Failed to add TRuck')
    }
  }

  const clickSubmit =()=>{
      console.log('Clikcd button')
  }

  const handleChange = (e)=>{
    const value = e.target.value
     console.log(value)
     /* setForm({...form, [name]: value,}) */
    
  }

  const clickTag = ()=>{
    console.log('Clikced the TAgs')
  }

  const handleSubmit =(e)=>{
    /* e.preventDefault() 
      postData()
      */
    console.log('suuuubmittted')
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
        <Link href='/'>
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
              name='truckname' 
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

        </Link>
      </div>
    );
}

export default registertruck
