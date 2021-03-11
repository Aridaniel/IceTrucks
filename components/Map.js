import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"

function Map() {
  return (
    <GoogleMap defaultCenter={{lat: 64, lng: -18 }} defaultZoom={6} />
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;