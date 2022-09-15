import React from 'react'
import Map from './components/map.comp'
import {useLoadScript} from '@react-google-maps/api'
import './App.css'

const App = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: 'AIzaSyDxOWNDbrvL_AM863ICsg9bEXZJwuCglKE',
    libraries: ['places', 'drawing']
  })
  if (!isLoaded) return <p>loading...</p>;
  return (
    <div className='container'>
        <Map />
    </div>
  )
}

export default App