import GoogleMapReact from "google-map-react";

export default class MarkerMap {
  createMarker(
    position: GoogleMapReact.Coords,
    icon: string,
    maps: any,
    map: any
  ) {
    return new maps.Marker({
      position: position,
      icon: new maps.MarkerImage(icon),
      map: map,
    });
  }

  clearMarkers(markers: any) {
    for (let m of markers) {
      m.setMap(null);
    }
  }
}
