import React from "react"
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import mapStyles from '../resources/mapStyles';

export default function Map() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY,
    // Enable libraries such as places to use them.
  });

  if(loadError) return 'Error loading maps...';
  if(!isLoaded) return 'Loading Maps';

  const mapContainerStyle = {
    width: '80%',
    height: '70%'
  };

  const center = {
    // Reykjavik 
    lat: 64.126518,
    lng: -21.817438
  };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
  }

  return(
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} options={options} onClick={(event) => console.log(event)}></GoogleMap>
  );
};