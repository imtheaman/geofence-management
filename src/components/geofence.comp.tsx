import { Circle, Marker } from "@react-google-maps/api";
import React, { memo, useCallback, useMemo } from "react";

import { setEditableCircle } from "../redux/slices/geofence";
import { useAppDispatch } from "../redux/store";
let timeout: any;

interface Props {
  latitude: number;
  longitude: number;
  radius: number;
  identifier: string;
  id: string;
  editable: boolean;
  clusterer: any;
}

const Geofence: React.FC<Props> = ({
  latitude,
  longitude,
  id,
  identifier,
  radius,
  editable,
  clusterer,
}) => {
  // const [circleEditable, setCircleEditable] = useState(false);
  const dispatch = useAppDispatch();

  const circleOptions = useMemo<google.maps.CircleOptions>(
    () => ({
      strokeColor: "orange",
      fillColor: "orange",
      fillOpacity: 0.1,
      strokeWeight: 2,
    }),
    []
  );
  const onCircleLoad = useCallback((shape: google.maps.Circle, id: string) => {
    ["radius_changed", "center_changed"].forEach((event) =>
      shape.addListener(event, () => {
        clearTimeout(timeout);
        const center = shape.getCenter()!;
        const latitude = center.lat();
        const longitude = center.lng();
        const radius = Math.floor(shape.getRadius());
        console.log("event running", latitude, longitude, radius);
        dispatch(
          setEditableCircle({
            id,
            latitude,
            longitude,
            radius,
          })
        );
      })
    );
  }, []);

  return (
    <div>
      <Marker
        position={{ lat: latitude, lng: longitude }}
        title={identifier}
        clusterer={clusterer}
        // onClick={() => setCircleEditable((prev) => !prev)}
      />
      <Circle
        options={circleOptions}
        editable={editable}
        key={id}
        center={{ lat: latitude, lng: longitude }}
        radius={radius}
        onLoad={(circle) => onCircleLoad(circle, id)}
      />
    </div>
  );
};

export default memo(Geofence);
