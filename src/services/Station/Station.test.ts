import { AxiosResponse } from "axios";
import { getServerURL } from "../../helper/Utils";
import { Account } from "../../model/Account";
import HttpService from "../Http/Http.service";
import { StationService } from "./Station.service";

jest.mock("../Http/Http.service");

describe("Station service", () => {
  describe("when get station service is called", () => {
    it("should return a list of station without status", async () => {
      jest.spyOn(HttpService, "get").mockReturnValue(
        Promise.resolve({
          data: [
            {
              stationCode: 16107,
              name: "Benjamin Godard - Victor Hugo",
              latitude: 48.865983,
              longitude: 2.275725,
              capacity: 35,
              rentalMethods: null,
              states: null,
            },
            {
              stationCode: 31104,
              name: "Mairie de Rosny-sous-Bois",
              latitude: 48.871256519012,
              longitude: 2.4865807592869,
              capacity: 30,
              rentalMethods: "CREDITCARD",
              states: null,
            },
            {
              stationCode: 11104,
              name: "Charonne - Robert et Sonia Delauney",
              latitude: 48.85590755596891,
              longitude: 2.3925706744194035,
              capacity: 20,
              rentalMethods: null,
              states: null,
            },
          ],
        } as AxiosResponse<any, any>)
      );

      const stationService = new StationService();
      const stations = await stationService.getStations();

      expect(HttpService.get).toHaveBeenCalledWith(
        getServerURL() + ":8083/stations"
      );

      expect(stations).toEqual([
        {
          id: 16107,
          lat: 48.865983,
          lng: 2.275725,
          name: "Benjamin Godard - Victor Hugo",
          state: { nmbBikeAvailable: undefined, nmbPlaceAvailable: undefined },
        },
        {
          id: 31104,
          lat: 48.871256519012,
          lng: 2.4865807592869,
          name: "Mairie de Rosny-sous-Bois",
          state: { nmbBikeAvailable: undefined, nmbPlaceAvailable: undefined },
        },
        {
          id: 11104,
          lat: 48.85590755596891,
          lng: 2.3925706744194035,
          name: "Charonne - Robert et Sonia Delauney",
          state: { nmbBikeAvailable: undefined, nmbPlaceAvailable: undefined },
        },
      ]);
    });

    it("should return a list of station with status", async () => {
      jest.spyOn(HttpService, "get").mockReturnValue(
        Promise.resolve({
          data: [
            {
              stationCode: 16107,
              name: "Benjamin Godard - Victor Hugo",
              latitude: 48.865983,
              longitude: 2.275725,
              capacity: 35,
              rentalMethods: null,
              states: { numBikesAvailable: 23, numDocksAvailable: 32 },
            },
            {
              stationCode: 31104,
              name: "Mairie de Rosny-sous-Bois",
              latitude: 48.871256519012,
              longitude: 2.4865807592869,
              capacity: 30,
              rentalMethods: "CREDITCARD",
              states: { numBikesAvailable: 42, numDocksAvailable: 5 },
            },
            {
              stationCode: 11104,
              name: "Charonne - Robert et Sonia Delauney",
              latitude: 48.85590755596891,
              longitude: 2.3925706744194035,
              capacity: 20,
              rentalMethods: null,
              states: { numBikesAvailable: 13, numDocksAvailable: 7 },
            },
          ],
        } as AxiosResponse<any, any>)
      );

      const stationService = new StationService();
      const stations = await stationService.getStations();

      expect(HttpService.get).toHaveBeenCalledWith(
        getServerURL() + ":8083/stations"
      );

      expect(stations).toEqual([
        {
          id: 16107,
          lat: 48.865983,
          lng: 2.275725,
          name: "Benjamin Godard - Victor Hugo",
          state: { nmbBikeAvailable: 23, nmbPlaceAvailable: 32 },
        },
        {
          id: 31104,
          lat: 48.871256519012,
          lng: 2.4865807592869,
          name: "Mairie de Rosny-sous-Bois",
          state: { nmbBikeAvailable: 42, nmbPlaceAvailable: 5 },
        },
        {
          id: 11104,
          lat: 48.85590755596891,
          lng: 2.3925706744194035,
          name: "Charonne - Robert et Sonia Delauney",
          state: { nmbBikeAvailable: 13, nmbPlaceAvailable: 7 },
        },
      ]);
    });
  });

  describe("when get status service is called", () => {
    it("should return the updated list of status", async () => {
      jest.spyOn(HttpService, "get").mockReturnValue(
        Promise.resolve({
          data: [
            {
              id: 0,
              station: {
                stationCode: 16107,
                states: null,
                timeStampInformationGot: 0,
                name: null,
                latitude: 0.0,
                longitude: 0.0,
                capacity: 0,
                rentalMethods: null,
              },
              numBikesAvailable: 3,
              numBikesAvailableTypesMechanical: 1,
              numBikesAvailableTypesEbike: 2,
              numDocksAvailable: 32,
              isInstalled: true,
              isReturning: true,
              isRenting: true,
              lastReported: 1670653617,
            },
            {
              id: 0,
              station: {
                stationCode: 31104,
                states: null,
                timeStampInformationGot: 0,
                name: null,
                latitude: 0.0,
                longitude: 0.0,
                capacity: 0,
                rentalMethods: null,
              },
              numBikesAvailable: 19,
              numBikesAvailableTypesMechanical: 10,
              numBikesAvailableTypesEbike: 9,
              numDocksAvailable: 10,
              isInstalled: true,
              isReturning: true,
              isRenting: true,
              lastReported: 1670653662,
            },
            {
              id: 0,
              station: {
                stationCode: 11104,
                states: null,
                timeStampInformationGot: 0,
                name: null,
                latitude: 0.0,
                longitude: 0.0,
                capacity: 0,
                rentalMethods: null,
              },
              numBikesAvailable: 5,
              numBikesAvailableTypesMechanical: 1,
              numBikesAvailableTypesEbike: 4,
              numDocksAvailable: 14,
              isInstalled: true,
              isReturning: true,
              isRenting: true,
              lastReported: 1670653696,
            },
          ],
        } as AxiosResponse<any, any>)
      );

      const stationService = new StationService();
      const statuses = await stationService.getStatus();

      expect(HttpService.get).toHaveBeenCalledWith(
        getServerURL() + ":8083/stationStates"
      );

      expect(statuses).toEqual([
        { idStation: 16107, nmbBikeAvailable: 3, nmbPlaceAvailable: 32 },
        { idStation: 31104, nmbBikeAvailable: 19, nmbPlaceAvailable: 10 },
        { idStation: 11104, nmbBikeAvailable: 5, nmbPlaceAvailable: 14 },
      ]);
    });
  });
});
