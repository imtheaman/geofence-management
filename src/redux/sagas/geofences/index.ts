import { takeLatest, takeEvery, all } from "redux-saga/effects";
import { fetchData, deleteData, updateData, createData } from "./utils";

export function* fetchDataSaga() {
  yield takeLatest("geofences/FETCH_DATA", fetchData);
}

export function* deleteGeofenceSaga() {
  yield takeEvery("geofences/DELETE_GEOFENCE", deleteData);
}

export function* updateGeofenceSaga() {
  yield takeEvery("geofences/UPDATE_GEOFENCE", updateData);
}

export function* createGeofenceSaga() {
  yield takeEvery("geofences/CREATE_GEOFENCE", createData);
}

export default function* rootSaga() {
  yield all([
    fetchDataSaga(),
    deleteGeofenceSaga(),
    updateGeofenceSaga(),
    createGeofenceSaga(),
  ]);
}
