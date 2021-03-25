import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import SuccessModal from '../components/SuccessModal'
import TagList from '../components/TagList'
import Search from '../components/Search'
import tags from '../resources/availableTags'
import { useAuth } from '../auth'
import firebaseClient from '../firebaseClient'
import firebase from 'firebase/app'
import "firebase/auth";
import nookies from 'nookies';
import { verifyIdToken } from '../firebaseAdmin';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/RegisterTrucks.module.css'

function registertruck({session}) {
  firebaseClient();
  const { user } = useAuth();
  const router = useRouter();
  const [success, setSuccess] = useState(false)
  // Temporary truck for testing the modal
  const [tmpTruck, setTmpTruck] = useState({name: 'Pizza Truck', email: 'owner@pizza.com', phone: 1112233, menu: 'https://somepizzastore.com/menu', description: 'This is an awesome pizza place for everyone to come to enjoy', location: {lat: 50, lng: 50}})
  const [addedTruck, setAddedTruck] = useState(null)
  const [chosenLocation, setChosenLocation] = useState({})
  const [chosenAddress, setChosenAddress] = useState('')
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
    // console.log('TruccUser: ', user);
    router.prefetch('/');
    return () => {
      // Just making sure that success modal closes when component dismounts
      setSuccess(false);
      setAddedTruck(null);
    }
  }, [])

  /* The POST method adds a new entry in the mongodb database. */
  const postTruck = async () => {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken(/*Force refresh*/ true);
      const res = await fetch((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:3000/api/trucks' : 'https://ice-trucks.herokuapp.com/api/trucks', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          menu: form.menu,
          description: form.description,
          address: chosenAddress,
          location: chosenLocation,
          tags: chosenTags
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': idToken
        },
      })
      const data = await res.json();
      // Throw error with status code in case Fetch API req failed
      if (data.message){
        console.log('data: ', data)
        return;
      } else {
        setAddedTruck(data)
        setSuccess(true)
      }
    } catch (error) {
      console.log('Failed to add Truck', error)
      truckFormAlert(error);
    }
  }

  const handleChange = (e)=>{
    const value = e.target.value
    setForm({...form, [e.target.name]: value}) 
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    if(!chosenLocation.lat) {
      // console.log('Needs a location...');
      truckFormAlert('Type in a location and select it from the list.')
      return;
    }
    postTruck()
  }

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

  const truckFormAlert = (error) => {
    toast.warn(error, {position: 'bottom-center', closeButton: false, style: {color: 'black'}})
  }

  // Maybe also check if user in order to render the 'Loading' page while user signs out?
  if(session) {
    return (
      <>
        {/* Skip this user check? */}
        <div className={styles.truckForm}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>The Trucks Info</h1>
            <p style={{color:"white"}}>User name: {user ? user.displayName : 'NoName'}</p>
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
            <Search setChosenLocation={setChosenLocation} setChosenAddress={setChosenAddress} />
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
          <button onClick={async () => {
            await firebase.auth().signOut();
            router.push('/');
          }}>
            Sign out
          </button>
          <ToastContainer position="bottom-center" autoClose={4000} hideProgressBar={true}/>

          {success ? <SuccessModal truck={addedTruck} success={success} setSuccess={setSuccess}/> : null}
        </div>
      </>
    );
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
}

// Getting serverside props in order to check cookies?
export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    // console.log('TOKEN: ', token);
    return {
      props: {session: token}
    }
  } catch(error) {
    // We don't have a cookie and we need them to reauthenticate
    context.res.writeHead(302, {location: "/signup"});
    context.res.end();
    return { props: [] };
  }
}

export default registertruck;
