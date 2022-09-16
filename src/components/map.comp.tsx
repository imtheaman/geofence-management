import { GoogleMap, MarkerClusterer } from "@react-google-maps/api";
import "../App.css";

import React, { useCallback, useEffect, useMemo } from "react";
import Geofence from "./geofence.comp";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useGeolocated } from "react-geolocated";
import {
  setEditableCircle,
  setEditMode,
  setMapCenter,
} from "../redux/slices/geofence";

// ntccp
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const [geofences, editableCircle, mapCenter, editMode] = useAppSelector(
    ({ geofenceState: { editMode, editableCircle, geofences, mapCenter } }) => [
      geofences,
      editableCircle,
      mapCenter,
      editMode,
    ]
  );
  
  const dispatch = useAppDispatch();
  const { coords, isGeolocationEnabled } = useGeolocated();

  useEffect(() => {
    if (!isGeolocationEnabled)
      console.log("geolocation permission not granted");
    if (coords)
      dispatch(setMapCenter({ lat: coords.latitude, lng: coords.longitude }));
  }, [coords]);

  const mapOptions = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onMapLoad = useCallback((map: google.maps.Map) => {
    map.addListener("click", (mapMouseEvent: google.maps.MapMouseEvent) => {
      dispatch(
        setEditableCircle({
          identifier: "",
          latitude: mapMouseEvent.latLng!.lat(),
          longitude: mapMouseEvent.latLng!.lng(),
          radius: 100,
        })
      );
      dispatch(setEditMode("ADD"));
    });
  }, []);

  return (
    <GoogleMap
      zoom={16}
      mapContainerClassName="map-container"
      options={mapOptions}
      center={mapCenter}
      onLoad={onMapLoad}
    >
      <MarkerClusterer>
        {/* @ts-ignore */}
        {(clusterer: any) =>
          (editMode === "VIEW" ? geofences : [editableCircle]).map((fence) => (
            <Geofence
              key={fence!.id}
              {...fence}
              editable={editMode !== "VIEW"}
              clusterer={clusterer}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  );
};

export default Map;
