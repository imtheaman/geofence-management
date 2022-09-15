import {
  GoogleMap,
  Circle,
  Marker
} from '@react-google-maps/api'
import '../App.css'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
// ntccp
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const [geofences, setGeofences] = useState([{id: 'xyz', lat: 24.876, lng: 86.567, radius: 300}, {id: 'abc', lat: 34.856, lng: 86.567, radius: 300}])
  const [center, setCenter] = useState({lat: 24.856, lng: 86.567});
  const mapOptions = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const circleOptions = useMemo<any>(
    () => ({
      strokeColor: "orange",
      fillColor: "orange",
      fillOpacity: 0.1,
      strokeWeight: 2,
    }),
    []
  );

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCenter({lat: 34.856, lng: 86.567})
  //   }, 6000)
  // }, [])

  const onCircleLoad = useCallback(
    (shape: google.maps.Circle, id: string) =>
      ["radius_changed", "center_changed"].forEach((event) =>
        shape.addListener(event, () => {
          const center = shape.getCenter()!;
          const latitude = center.lat().toString();
          const longitude = center.lng().toString();
          const radius = Math.floor(shape.getRadius());
          console.log("event running", latitude, longitude, radius, id);
        })
      ),
    []
  );

  return (
    <div className='map'>
      <GoogleMap 
      zoom={16}
      mapContainerClassName='map-container'
      options={mapOptions}
      center={center}
      onLoad={(map) => console.log('map loaded')}>
        <Marker position={{lat: 34.567, lng: 86.567}} />
          <Circle options={circleOptions} center={{lat: 34.567, lng: 86.567}} radius={300} onLoad={(circle) => onCircleLoad(circle, 'id')}/>
        {/* {geofences.map(({lat, lng, id, radius}) => (
        <>
          <Marker position={{lat, lng}} />
          <Circle options={circleOptions} key={id} center={{lat, lng}} radius={radius} onLoad={(circle) => onCircleLoad(circle, id)}/>
        </>
        ))} */}
        </GoogleMap>
    </div>
  )
}

export default Map