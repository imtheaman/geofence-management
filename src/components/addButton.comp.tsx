import React from "react";
import AddIcon from "../assets/add.svg";
import { setEditMode, setEditableCircle } from "../redux/slices/geofence";
import { useAppDispatch, useAppSelector } from "../redux/store";

const Add = () => {
  const dispatch = useAppDispatch();
  const mapCenter = useAppSelector(
    ({ geofenceState: { mapCenter } }) => mapCenter
  );
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
            identifier: "",
            latitude: mapCenter.lat,
            longitude: mapCenter.lng,
            radius: 100,
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
