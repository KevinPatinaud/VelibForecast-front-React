import { StationState } from "./StationState";

export interface Station {
  id: number;
  name: string;
  lat: number;
  lng: number;
  capacity: number;
  state?: StationState;
}
