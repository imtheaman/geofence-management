import { ChangeEvent, useCallback } from "react";
import { setEditableCircle } from "../redux/slices/geofence";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { debounce } from "lodash";

const Editor = () => {
  const dispatch = useAppDispatch();
  const [editableCircle, editMode] = useAppSelector(
    ({ geofenceState: { editableCircle, editMode } }) => [
      { ...editableCircle },
      editMode,
    ]
  );

  const { identifier, latitude, longitude, radius } = editableCircle;
  console.log("running editor");
  const HandleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, code: string) => {
      switch (code) {
        case "IDENTIFIER":
          debounce(
            () =>
              dispatch(
                setEditableCircle({
                  ...editableCircle,
                  identifier: e.target.value,
                })
              ),
            200
          );
          return;
        case "LATITUDE":
          debounce(
            () =>
              dispatch(
                setEditableCircle({
                  ...editableCircle,
                  latitude: +e.target.value,
                })
              ),
            200
          );
          return;
        case "LONGITUDE":
          debounce(
            () =>
              dispatch(
                setEditableCircle({
                  ...editableCircle,
                  longitude: +e.target.value,
                })
              ),
            200
          );
          return;
        case "RADIUS":
          debounce(
            () =>
              dispatch(
                setEditableCircle({
                  ...editableCircle,
                  radius: +e.target.value,
                })
              ),
            200
          );
          return;
      }
    },
    []
  );

  const HandleSubmit = () => {};

  return (
    <>
      <h2>Editor</h2>
      <form onSubmit={HandleSubmit}>
        <input
          placeholder="identifier"
          className={!identifier ? "error" : ""}
          // value={identifier}
          onChange={(e) => HandleChange(e, "IDENTIFIER")}
        />
        <input
          placeholder="latitude"
          className={!latitude ? "error" : ""}
          // value={latitude}
          onChange={(e) => HandleChange(e, "LATITUDE")}
        />
        <input
          placeholder="longitude"
          className={!longitude ? "error" : ""}
          // value={longitude}
          onChange={(e) => HandleChange(e, "LONGITUDE")}
        />
        <input
          placeholder="radius"
          className={!radius ? " error" : ""}
          // value={radius}
          type="number"
          onChange={(e) => HandleChange(e, "RADIUS")}
        />

        <input type="submit" value={editMode === "ADD" ? "Add" : "Update"} />
      </form>
    </>
  );
};

export default Editor;
