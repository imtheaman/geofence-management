import React, { useEffect } from "react";
import AddIcon from "../assets/add.svg";
import { setEditMode, setEditableCircle, setMapCenter } from "../redux/slices/geofence";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {v4 as uuid} from 'uuid'
import { useGeolocated } from "react-geolocated";

const Add = () => {
  const dispatch = useAppDispatch();
  const { coords, isGeolocationEnabled } = useGeolocated();
  
  useEffect(() => {
    if (!isGeolocationEnabled)
    console.log("geolocation permission not granted");
    if (coords)
    dispatch(setMapCenter({ lat: coords.latitude, lng: coords.longitude }));
  }, [coords]);

  const mapCenter = useAppSelector(({geofenceState: {mapCenter}}) => mapCenter)

  return (
    <button
      style={{
        position: "absolute",
        display: "flex",
        width: "5rem",
        height: "2.5rem",
        background: "#fff",
        padding: "12px",
        bottom: "1rem",
        right: "1rem",
        zIndex: 14,
        fontSize: "16px",
        color: "black",
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => {
        dispatch(setEditMode("ADD"));
        dispatch(
          setEditableCircle({
            id: uuid(),
            identifier: "",
            latitude: mapCenter.lat,
            longitude: mapCenter.lng,
            radius: 100,
            notify_on_entry: true,
            notify_on_exit: true
          })
        );
      }}
    >
      <img src={AddIcon} width={"16px"} style={{ marginRight: "4px" }} />
      <p>Add</p>
    </button>
  );
};

export default Add;
