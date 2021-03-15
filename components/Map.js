import React, { useState, useCallback, useRef } from "react"
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import tmpCars from '../resources/tmpCars';
import mapStyles from '../resources/mapStyles';

// In order to allow truck owners to mark their location we need to use geolocation to use the current location of the browser OR
// use-places-autocomplete in order to be able to select an address (possibly)

export default function Map() {
  const [markers, setMarkers] = useState(tmpCars);
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY,
    // Enable libraries here such as places to use them.
  });

  const handleMapClick = useCallback((event) => {
    console.log(event);
    setMarkers(current => [...current, {lat: event.latLng.lat(), lng: event.latLng.lng()}])
  }, []);

  const mapRef = useRef();
  // We useRef when we want to retain state without causing re-renders.
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if(loadError) return 'Error loading maps...';
  if(!isLoaded) return 'Loading Maps';

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
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
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} options={options} onClick={handleMapClick} onLoad={onMapLoad}>
      {/* To change the marker style add the icon property to the Marker component in the map function (create a svg and control the size) */}
      {markers.map((marker, index) => <Marker key={index} position={{lat: marker.lat, lng: marker.lng}} icon={{url: '/redMarker.svg'}}/>)}
    </GoogleMap>
  );
};