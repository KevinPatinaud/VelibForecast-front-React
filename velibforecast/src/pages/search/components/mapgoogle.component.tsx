import { FC, useRef, useState } from "react";
import GoogleMapReact, { ClickEventValue } from "google-map-react";
import { Station } from "../../../model/Station";
import MarkerMap from "./markermap.helper";

export interface MapGoogleProps {
  style?: React.CSSProperties | undefined;
  stations: Station[];
  idStationSelected: number;
  initZoom: number;
  initCenter: GoogleMapReact.Coords;
  onStationClick: (station: Station) => void;
}

export interface CustomMarker {
  lat: number;
  lng: number;
  img: String;
  onClick: (e: ClickEventValue) => void;
}

const markermap = new MarkerMap();

const MapGoogle: FC<MapGoogleProps> = (props) => {
  const map = useRef(undefined as any);
  const maps = useRef(undefined as any);

  const prevMarkersRef = useRef<any>([]);

  const onLoaded = (mapLoaded: any, mapsLoaded: any) => {
    map.current = mapLoaded;
    maps.current = mapsLoaded;
  };

  const generateMarkers = () => {
    markermap.clearMarkers(prevMarkersRef.current);

    props.stations.forEach((station: Station) => {
      const marker = markermap.createMarker(
        { lat: station.lat, lng: station.lng },
        station.id === props.idStationSelected
          ? "/img/marker_selected.png"
          : "/img/marker_ok.png",
        maps.current,
        map.current
      );
      prevMarkersRef.current.push(marker);
    });
  };

  const onClick = (e: ClickEventValue) => {
    if (
      /*  e.event.target.nodeName !== "DIV" || */
      e.event.target.attributeStyleMap.size == 19
    ) {
      let nearestStation = props.stations[0];
      let distanceNearestMarker = -1;

      props.stations.forEach((station) => {
        const currDistance = Math.sqrt(
          Math.pow(station.lat - e.lat, 2) + Math.pow(station.lng - e.lng, 2)
        );

        if (
          distanceNearestMarker === -1 ||
          currDistance < distanceNearestMarker
        ) {
          nearestStation = station;
          distanceNearestMarker = currDistance;
        }
      });
      props.onStationClick(nearestStation);
    }
  };

  return (
    <div
      data-testid="MapGoogle_Container"
      className="google-map"
      style={props.style}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDrehj4_m9JcFyhn1zMQFe6LvGyTUVQceY" }}
        zoom={props.initZoom}
        center={{ lat: props.initCenter.lat, lng: props.initCenter.lng }}
        onGoogleApiLoaded={(maps: {
          map: any;
          maps: any;
          ref: Element | null;
        }) => {
          onLoaded(maps.map, maps.maps);
        }}
        options={{
          zoomControl: true,
          controlSize: 30,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
        }}
        onClick={onClick}
        onChange={(e) => {
          if (e.zoom > 14) {
            generateMarkers();
          } else {
            markermap.clearMarkers(prevMarkersRef.current);
          }
        }}
      ></GoogleMapReact>
    </div>
  );
};

export default MapGoogle;
