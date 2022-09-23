import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { AddDetails, Geofence, UpdateDetails } from "../../../vite-env";
import { getCenter } from "geolib";
import {
  createGeofence,
  deleteGeofence,
  setEditMode,
  setGeofences,
  setMapCenter,
  updateGeofence,
} from "../../slices/geofence";

const BASE_URL =
  "https://screenzycommercialsllp-125263-ruby.b125263.stage.eastus.az.svc.builder.ai/bx_block_geofence2/geofence";

export function* fetchData() {
  const res: Response = yield call(() =>
    fetch(BASE_URL, {
      method: "GET",
    })
  );
  const data: { data: Geofence[] } = yield res.json();
  console.log(data.data, "from fetchData");
  yield put(setGeofences(data.data));
  // @ts-ignore
  const center = getCenter(data.data.map(({latitude, longitude}) => ({latitude,  longitude})));
  if (!center) return;
  yield put(setMapCenter({lat: center.latitude, lng: center.longitude}))
}

export function* deleteData(action: PayloadAction<{ id: string }>) {
  const res: Response = yield call(() =>
    fetch(`${BASE_URL}/${action.payload.id}`, {
      method: "DELETE",
    })
  );
  const data: { data: { message: string } } = yield res.json();
  yield put(deleteGeofence({ id: action.payload.id }));
  data.data.message === "Deleted" && alert("delete success");
  yield put(setEditMode('VIEW'))
}

export function* updateData(action: PayloadAction<UpdateDetails>) {
  console.log(action.payload, 'update gen')
  const res: Response = yield call(() =>
    fetch(`${BASE_URL}/${action.payload.id}`, {
      method: "PUT",
      body: JSON.stringify(action.payload),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  );
  const data: {data: Geofence} = yield res.json();
  yield put(updateGeofence(data.data));
  data.data.id && alert("update success");
  yield put(setEditMode('VIEW'))
}

export function* createData(action: PayloadAction<AddDetails>) {
  const res: Response = yield call(() =>
    fetch(`${BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  );
  const data: {data: Geofence} = yield res.json();
  yield put(createGeofence(data.data));
  data.data.id && alert("create success");
  yield put(setEditMode('VIEW'))
}
