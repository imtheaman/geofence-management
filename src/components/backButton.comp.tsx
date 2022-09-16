import React from "react";
import { setEditableCircle, setEditMode } from "../redux/slices/geofence";
import { useAppDispatch } from "../redux/store";

const BackButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      className="back-button"
      onClick={() => {
        dispatch(setEditMode("VIEW"));
      }}
    >
      &#8592; Back
    </button>
  );
};

export default BackButton;
