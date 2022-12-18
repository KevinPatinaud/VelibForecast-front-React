import { Station } from "../../model/Station";
import { StationState } from "../../model/StationState";
import { HttpService } from "../Http/Http.service";

export class StationService {
  httpService = new HttpService();
  async getStations() {
    const httpResponse = await this.httpService.get(
      "http://localhost:8083/stations"
    );

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
  }

  async getStatus() {
    const httpResponse = await this.httpService.get(
      "http://localhost:8083/stationStates"
    );

    const states = [];
    for (let i = 0; i < httpResponse.data.length; i++) {
      const state = {
        idStation: httpResponse.data[i]?.stationCode,
        nmbBikeAvailable: httpResponse.data[i]?.numBikesAvailable,
        nmbPlaceAvailable: httpResponse.data[i]?.numDocksAvailable,
      } as StationState;
      states.push(state);
    }
    return states;
  }
}
