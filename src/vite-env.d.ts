/// <reference types="vite/client" />

type LatLngLiteral = google.maps.LatLngLiteral;
interface GeofenceLiteral extends LatLngLiteral {
  meterRadius: number;
  identifier: string;
}

export interface Geofence extends Details {
  id: string;
  notify_on_entry: boolean;
  notify_on_exit: boolean;
  created_at: string;
  updated_at: string;
}

export type Details = {
  latitude: number;
  longitude: number;
  radius: number;
  identifier: string;
};

export type UpdateDetails = {
  id: string;
  details: Details;
};

export type AddDetails = Details;
