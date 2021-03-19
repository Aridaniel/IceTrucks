import React from 'react'
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from '@reach/combobox'
import "@reach/combobox/styles.css";
import styles from '../styles/Search.module.css'

export default function Search({setChosenLocation}) {
  // ready: is the package ready to go, value: current value user has typed in the search field, suggestions: what data we get suggested form googles api
  const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
    // Focus on locations near Reykjavik in a 100km radius
    requestOptions: {
      location: {lat: () => 64.126518, lng: () => -21.817438},
      radius: 100 * 1000
    }
  });
  
  return (
    <div className={styles.searchContainer}>
      <Combobox onSelect={async (address) => {
        // When a user selects a location we set the combobox value to the address and clear the suggestion list
        setValue(address, false);
        clearSuggestions();

        try {
          // getGeoCode takes an object as parameter with the address property
          const results = await getGeocode({address});
          const {lat, lng} = await getLatLng(results[0]);
          setChosenLocation({lat, lng});
        } catch(error) {
          console.log('Error: ', error);
        }
        
        }}>
        <ComboboxInput value={value} onChange={(ev) => {setValue(ev.target.value)}} disabled={!ready} placeholder="Enter location"/>
        <ComboboxPopover>
          <ComboboxList>
            {/* If the status given in suggestions is ok we can map suggestions */}
            {status === "OK" && data.map(({id, description}, index) => <ComboboxOption key={index} value={description} />)}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}
