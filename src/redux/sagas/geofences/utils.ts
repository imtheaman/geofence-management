import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { AddDetails, Geofence, UpdateDetails } from "../../../vite-env";

import {
  createGeofence,
  deleteGeofence,
  setGeofences,
  updateGeofence,
} from "../../slices/geofence";

const BASE_URL =
  "https://screenzycommercialsllp-125263-ruby.b125263.dev.eastus.az.svc.builder.cafe/bx_block_geofence2/geofence";

export function* fetchData() {
  const res: Response = yield call(() =>
    fetch(BASE_URL, {
      method: "GET",
    })
  );
  const data: { data: Geofence[] } = yield res.json();
  console.log(data.data, "from fetchData");
  yield put(setGeofences(data.data));
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
}

export function* updateData(action: PayloadAction<UpdateDetails>) {
  const res: Response = yield call(() =>
    fetch(`${BASE_URL}/${action.payload.id}`, {
      method: "PUT",
      body: JSON.stringify(action.payload),
    })
  );
  const data: Geofence = yield res.json();
  yield put(updateGeofence(data));
  data.id && alert("update success");
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
  const data: Geofence = yield res.json();
  yield put(createGeofence(data));
  data.id && alert("create success");
}
