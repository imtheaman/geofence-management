import React, { useState } from "react";
import Map from "./components/map.comp";
import { useLoadScript } from "@react-google-maps/api";
import "./App.css";
import Editor from "./components/editor.comp";
import List from "./components/list.comp";
import AddButton from "./components/addButton.comp";
import { useAppSelector } from "./redux/store";
import BackButton from "./components/backButton.comp";

const libs: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places", "drawing"];

const App = () => {
  const [geofences, setGeofences] = useState([
    { id: "xyz", lat: 24.876, lng: 86.567, radius: 300 },
    { id: "abc", lat: 34.856, lng: 86.567, radius: 300 },
  ]);
  const [editMode] = useAppSelector(({ geofenceState: { editMode } }) => [
    editMode,
  ]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GMAP_API,
    libraries: libs,
  });
  if (!isLoaded) return <p>loading...</p>;
  return (
    <>
      <div className="container">
        <div className="controls">
          {editMode === "VIEW" ? (
            <>
              <List />
              <AddButton />
            </>
          ) : (
            <>
              <BackButton />
              <Editor />
            </>
          )}
        </div>
        <div className="map">
          <Map />
        </div>
      </div>
    </>
  );
};

export default App;
