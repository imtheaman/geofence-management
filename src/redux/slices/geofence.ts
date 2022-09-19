import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddDetails, Geofence, UpdateDetails } from "../../vite-env";

interface State {
  geofences: Geofence[];
  isLoading: boolean;
  editMode: "EDIT" | "ADD" | "VIEW";
  editableCircle: Partial<Geofence> | undefined;
  mapCenter: { lat: number; lng: number };
}
const geofenceSlice = createSlice({
  name: "geofences",
  initialState: {
    geofences: [],
    isLoading: false,
    editMode: "VIEW",
    editableCircle: undefined,
    mapCenter: { lat: 0, lng: 0 },
  } as State,
  reducers: {
    FETCH_DATA: (state: State) => {
      state.isLoading = true;
    },
    setMapCenter: (
      state: State,
      action: PayloadAction<{ lat: number; lng: number }>
    ) => {
      state.mapCenter = action.payload;
    },
    setGeofences: (state: State, action: PayloadAction<Geofence[]>) => {
      state.geofences = action.payload;
      state.isLoading = false;
    },
    CREATE_GEOFENCE: (state: State, action: PayloadAction<AddDetails>) => {},
    createGeofence: (state: State, action: PayloadAction<Geofence>) => {
      state.geofences.push(action.payload);
    },
    UPDATE_GEOFENCE: (state: State, action: PayloadAction<UpdateDetails>) => {},
    updateGeofence: (state: State, action: PayloadAction<Geofence>) => {
      const index = state.geofences.findIndex(
        (fence) => fence.id === action.payload.id
      );
      state.geofences[index] = action.payload;
    },
    DELETE_GEOFENCE: (
      state: State,
      action: PayloadAction<{ id: string }>
    ) => {},
    deleteGeofence: (state: State, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const index = state.geofences.findIndex((fence) => fence.id === id);
      // would be better to use Object instead of array to store geofences collection.
      state.geofences.splice(index, 1);
    },
    setEditMode: (
      state: State,
      action: PayloadAction<"EDIT" | "ADD" | "VIEW">
    ) => {
      state.editMode = action.payload;
    },
    setEditableCircle: (
      state: State,
      action: PayloadAction<Partial<Geofence>>
    ) => {
      state.editableCircle = {...state.editableCircle, ...action.payload};
    },
  },
});

const { actions, reducer: GeofencesReducer } = geofenceSlice;
export default GeofencesReducer;
export const {
  setGeofences,
  createGeofence,
  updateGeofence,
  deleteGeofence,
  FETCH_DATA,
  CREATE_GEOFENCE,
  DELETE_GEOFENCE,
  UPDATE_GEOFENCE,
  setEditMode,
  setMapCenter,
  setEditableCircle,
} = actions;
