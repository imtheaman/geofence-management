import React from "react";
import { setEditableCircle, setEditMode, setMapCenter } from "../redux/slices/geofence";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Geofence } from "../vite-env";

const List = () => {
  const dispatch = useAppDispatch();
  const geofences = useAppSelector(
    ({ geofenceState: { geofences } }) => geofences
  );
  const HandleClick = (fence: Geofence) => {
    dispatch(setEditMode('EDIT'));
    dispatch(setEditableCircle(fence))
    dispatch(setMapCenter({lat: fence.latitude, lng: fence.longitude}))
  }
  return (
    <>
      <h2>List of geofences</h2>
      {geofences.map((fence) => (
        <div onClick={() => HandleClick(fence)} style={{cursor: 'pointer'}} key={fence.id} className={`${fence.notify_on_entry || fence.notify_on_exit ? 'active' : 'inactive'} fence-box`}>
          <p>{fence.identifier}</p>
        </div>
      ))}
    </>
  );
};

export default List;
