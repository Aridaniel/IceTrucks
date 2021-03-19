import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image'
import SuccessModal from '../components/SuccessModal'
import TagList from '../components/TagList'
import Search from '../components/Search'
import tags from '../resources/availableTags'
import styles from '../styles/RegisterTruck.module.css'

import { useRouter } from 'next/router'
import { Data } from '@react-google-maps/api';

/*  ToDo to PREVENT CRASH: */
//  Verify the register truck data
//  - Dont allow string for phone number
//  - Other checks as well...
function registertruck() {
  const [success, setSuccess] = useState(false)
  // Temporary truck for testing the modal
  const [tmpTruck, setTmpTruck] = useState({name: 'Pizza Truck', email: 'owner@pizza.com', phone: 1112233, menu: 'https://somepizzastore.com/menu', description: 'This is an awesome pizza place for everyone to come to enjoy', location: {lat: 50, lng: 50}})
  const [addedTruck, setaddedTruck] = useState(null)
  const [chosenLocation, setChosenLocation] = useState({})
  const [chosenTags, setChosenTags] = useState([])
  const [form, setForm] = useState({
    name:'',
    email:'',
    phone:'',
    menu:'',
    description:'',
    location:'',
  });

  useEffect(() => {
    return () => {
      // Just making sure that success modal closes when component dismounts
      setSuccess(false);
      setaddedTruck(null);
    }
  }, [])

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
          location: chosenLocation,
          tags: chosenTags
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
        console.log( 'Added Truck: ', data)
        setaddedTruck(data)
        setSuccess(true)
      }
    } catch (error) {
      console.log('Failed to add Truck', error)
    }
  }

  const handleChange = (e)=>{
    const value = e.target.value
    setForm({...form, [e.target.name]: value}) 
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    postTruck()
  }

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  /*  const formValidate = () => {
    let err = {}
    if (!form.truckname) err.truckname = 'Name is required'
    if (!form.email) err.email = 'Owner is required'
    if (!form.species) err.species = 'Species is required'
    if (!form.image_url) err.image_url = 'Image URL is required'
    return err
  } */

  // Handles the list of chosen tags
  const updateChosenTags = (tagName) => {
    const found = chosenTags.findIndex(item => item === tagName);
    // If found index is -1 then the tag is already chosen so it has to be removed from the list
    if(found !== -1) {
      const copy = [...chosenTags];
      copy.splice(found, 1);
      setChosenTags(copy);
      return;
    }
    setChosenTags([...chosenTags, tagName]);
  }

  return (
    <div className={styles.truckForm}>       
      <form onSubmit={handleSubmit} className={styles.form}>
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
        <Search setChosenLocation={setChosenLocation}/>
        {/* <input 
          name='location'
          onChange={handleChange} 
          type='text' 
          placeholder='Location'
        ></input> */}
        <h3 className={styles.selectTagsTitle}>Select Tags</h3>
        <TagList tags={tags} updateTagList={updateChosenTags}/>
        <button className={styles.submitBtn} type="submit" >Submit</button>   
      </form>

      {success ? <SuccessModal truck={addedTruck} success={success} setSuccess={setSuccess}/> : null}
    </div>
  );
}

export default registertruck
