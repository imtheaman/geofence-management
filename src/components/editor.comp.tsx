import { useEffect, useState } from "react";
import { CREATE_GEOFENCE, DELETE_GEOFENCE, setEditableCircle, UPDATE_GEOFENCE } from "../redux/slices/geofence";
import { useAppDispatch, useAppSelector } from "../redux/store";
import '../App.css'

const Editor = () => {
  const dispatch = useAppDispatch();
  const [editableCircle, editMode] = useAppSelector(
    ({ geofenceState: { editableCircle, editMode } }) => [
      { ...editableCircle },
      editMode,
    ]
    );
  const { identifier, latitude, longitude, radius, id, notify_on_entry, notify_on_exit } = editableCircle;

  const [lat, setLat] = useState<string>(latitude+'');
  const [lng, setLng] = useState<string>(longitude+'');
  const [idf, setIdf] = useState(identifier);
  const [rad, setRad] = useState(radius);

  
  const HandleSubmit = () => {
    console.log(editableCircle)
    if (!identifier || !latitude || !longitude || !radius) {
      alert('please enter all the values')
      return;
    }
    editMode === 'ADD' ? dispatch(CREATE_GEOFENCE(editableCircle)) : 
    // @ts-ignore
    dispatch(UPDATE_GEOFENCE(editableCircle));
  };

  useEffect(() => {
    +lat !== latitude && setLat(latitude!.toString());
    +lng !== longitude && setLng(longitude!.toString());
    rad !== radius && setRad(radius);
  }, [latitude, longitude, radius])
  
  useEffect(() => {
    dispatch(setEditableCircle({
      latitude: +lat,
      identifier: idf,
      longitude: +lng,
      radius: rad,
    }))
  },[lat, idf, lng, rad])

  const HandleDelete = (id: string) => dispatch(DELETE_GEOFENCE({id}));
  const ToggleDisable = (id: string, notify_on_entry: boolean, notify_on_exit: boolean) => dispatch(UPDATE_GEOFENCE({id,
    notify_on_entry: !notify_on_entry,
    notify_on_exit: !notify_on_exit
  }));
  return (
    <>
      <h2>Editor</h2>
      <div className="form">
        <input
          placeholder="identifier"
          className={!idf ? "error" : ""}
          value={idf}
          onChange={e => setIdf(e.target.value)}
        />
        <input
          placeholder="latitude"
          className={!lat ? "error" : ""}
          value={lat}
          onChange={e => setLat(e.target.value)}
        />
        <input
          placeholder="longitude"
          className={!lng ? "error" : ""}
          value={lng}
          onChange={e => setLng(e.target.value)}
        />
        <input
          placeholder="radius"
          className={!rad ? "error" : ""}
          value={rad}
          type="number"
          onChange={e => setRad(+e.target.value)}
        />
        <button onClick={HandleSubmit}>{editMode === "ADD" ? "Add" : "Update"}</button>
        {editMode === 'EDIT' && <button style={{backgroundColor: notify_on_entry || notify_on_exit ? 'gray' : 'green'}} onClick={() => ToggleDisable(id!, notify_on_entry!, notify_on_exit!)}>{notify_on_entry || notify_on_exit ? 'Disable' : 'Enable'}</button>}
        {editMode === 'EDIT' && <button style={{backgroundColor: 'red'}} onClick={() => HandleDelete(id!)}>Delete</button>}
        </div>
    </>
  );
};

export default Editor;
