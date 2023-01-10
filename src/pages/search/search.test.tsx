import { act, render, screen, waitFor } from "@testing-library/react";
import wrapper from "../../helper/test-context-builder";
import Search from "./search";
import StationService from "../../services/Station/Station.service";
import { Station } from "../../model/Station";
import { StationState } from "../../model/StationState";
import { MapGoogleProps } from "./components/mapgoogle/mapgoogle.component";
import { StationDetailsProps } from "./components/stationdetails/stationDetails";
import { SearchBarProps } from "./components/searchbar/searchBar";
import userEvent from "@testing-library/user-event";

jest.mock("../../services/Station/Station.service");

jest.mock(
  "./components/stationdetails/stationDetails",
  () => (props: StationDetailsProps) => {
    return <div>{JSON.stringify(props.station)}</div>;
  }
);

const mockChildComponent = jest.fn();

jest.mock(
  "./components/mapgoogle/mapgoogle.component",
  () => (props: MapGoogleProps) => {
    mockChildComponent(props);

    return (
      <div
        data-testid="GMap_Mock"
        onClick={() =>
          props.onStationClick({
            id: 1,
            name: "Benjamin Godard - Victor Hugo",
            lat: 48.865983,
            lng: 2.275725,
            capacity: 35,
            state: {
              idStation: 1,
              nmbBikeAvailable: 15,
              nmbPlaceAvailable: 20,
            } as StationState,
          } as Station)
        }
      >
        Google Map
      </div>
    );
  }
);

jest.mock("./components/searchbar/searchBar", () => (props: SearchBarProps) => {
  mockChildComponent(props);

  return (
    <div
      data-testid="searchbar_mock"
      onClick={() =>
        props.onSelect({
          id: 1,
          name: "Benjamin Godard - Victor Hugo",
          lat: 48.865983,
          lng: 2.275725,
          capacity: 35,
          state: {
            idStation: 1,
            nmbBikeAvailable: 15,
            nmbPlaceAvailable: 20,
          } as StationState,
        } as Station)
      }
    >
      searchbar
    </div>
  );
});

jest.spyOn(StationService, "getStations").mockImplementation();
jest.spyOn(StationService, "getStatus").mockImplementation();

const init = () => {
  const resStation = Promise.resolve([
    {
      id: 1,
      name: "Benjamin Godard - Victor Hugo",
      lat: 48.865983,
      lng: 2.275725,
      capacity: 35,
    } as Station,
    {
      id: 2,
      name: "Ledru rollin",
      lat: 48.852,
      lng: 2.26,
      capacity: 23,
    } as Station,
  ]);

  jest.spyOn(StationService, "getStations").mockReturnValue(resStation);

  const resStatus = Promise.resolve([
    {
      idStation: 1,
      nmbBikeAvailable: 15,
      nmbPlaceAvailable: 20,
    } as StationState,
    {
      idStation: 2,
      nmbBikeAvailable: 12,
      nmbPlaceAvailable: 11,
    } as StationState,
  ] as StationState[]);

  jest.spyOn(StationService, "getStatus").mockReturnValue(resStatus);
};

describe("<Search/>", () => {
  describe("When is rendered", () => {
    it("should be displayed and make API call", async () => {
      init();
      const scr = render(<Search />, { wrapper });

      await waitFor(() => expect(StationService.getStations).toBeCalled());
      await waitFor(() => expect(StationService.getStatus).toBeCalled());
    });

    describe("When the searchbar return a selected station", () => {
      it("should display this station", async () => {
        init();
        const scr = render(<Search />, { wrapper });

        await waitFor(() => expect(StationService.getStations).toBeCalled());
        await waitFor(() => expect(StationService.getStatus).toBeCalled());

        userEvent.click(scr.getByTestId("searchbar_mock"));

        await waitFor(() =>
          expect(
            scr.queryByText(
              '{"id":1,"name":"Benjamin Godard - Victor Hugo","lat":48.865983,"lng":2.275725,"capacity":35,"state":{"nmbBikeAvailable":15,"nmbPlaceAvailable":20}}'
            )
          ).toBeInTheDocument()
        );
      });
    });

    describe("When the Google Map return a selected station", () => {
      it("should display this station", async () => {
        init();
        const scr = render(<Search />, { wrapper });

        await waitFor(() => expect(StationService.getStations).toBeCalled());
        await waitFor(() => expect(StationService.getStatus).toBeCalled());

        userEvent.click(scr.getByTestId("GMap_Mock"));

        await waitFor(() =>
          expect(
            scr.queryByText(
              '{"id":1,"name":"Benjamin Godard - Victor Hugo","lat":48.865983,"lng":2.275725,"capacity":35,"state":{"nmbBikeAvailable":15,"nmbPlaceAvailable":20}}'
            )
          ).toBeInTheDocument()
        );
      });
    });
  });
});
