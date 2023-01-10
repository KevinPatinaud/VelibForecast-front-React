import { getServerURL } from "../../helper/Utils";
import { Station } from "../../model/Station";
import { StationState } from "../../model/StationState";
import HttpService from "../Http/Http.service";

const getStations = async () => {
  const httpResponse = await HttpService.get(getServerURL() + ":8083/stations");

  const stations = [];
  for (let i = 0; i < httpResponse.data.length; i++) {
    const station = {
      id: httpResponse.data[i]?.stationCode,
      name: httpResponse.data[i]?.name,
      lat: httpResponse.data[i]?.latitude,
      lng: httpResponse.data[i]?.longitude,
      state: {
        nmbBikeAvailable: httpResponse.data[i]?.states
          ? httpResponse.data[i]?.states?.numBikesAvailable
          : undefined,
        nmbPlaceAvailable: httpResponse.data[i]?.states
          ? httpResponse.data[i]?.states?.numDocksAvailable
          : undefined,
      },
    } as Station;
    stations.push(station);
  }
  return stations;
};

const getStatus = async () => {
  const httpResponse = await HttpService.get(
    getServerURL() + ":8083/stations/states"
  );

  const states = [];
  for (let i = 0; i < httpResponse.data.length; i++) {
    const state = {
      idStation: httpResponse.data[i]?.station?.stationCode,
      nmbBikeAvailable: httpResponse.data[i]?.numBikesAvailable,
      nmbPlaceAvailable: httpResponse.data[i]?.numDocksAvailable,
    } as StationState;
    states.push(state);
  }
  return states;
};

const getStatusInFutur = async (idStation: Number, inMinutes: Number) => {
  const httpResponse = await HttpService.get(
    getServerURL() +
      ":8083/station/" +
      idStation +
      "/state?inMinutes=" +
      inMinutes
  );

  return {
    idStation: idStation,
    nmbBikeAvailable: httpResponse.data?.numBikesAvailable,
    nmbPlaceAvailable: httpResponse.data?.numDockAvailable,
  } as StationState;
};

const StationService = {
  getStations,
  getStatus,
  getStatusInFutur,
};

export default StationService;
