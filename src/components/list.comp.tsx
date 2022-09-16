import React from "react";
import { useAppSelector } from "../redux/store";

const List = () => {
  const geofences = useAppSelector(
    ({ geofenceState: { geofences } }) => geofences
  );
  return (
    <>
      <h2>List of geofences</h2>
      {geofences.map((fence) => (
        <div key={fence.id} className="fence-box">
          <p>{fence.identifier}</p>
        </div>
      ))}
    </>
  );
};

export default List;
