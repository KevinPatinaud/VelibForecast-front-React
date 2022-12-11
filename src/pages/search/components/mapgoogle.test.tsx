import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import googleMapReact from "google-map-react";
import { Station } from "../../../model/Station";
import MapGoogle from "./mapgoogle.component";
import MarkerMap from "./markermap.helper";

jest.mock("./markermap.helper");

const markerMapMocked = MarkerMap as jest.MockedClass<typeof MarkerMap>;

markerMapMocked.prototype.createMarker.mockResolvedValue({});

const mockChildComponent = jest.fn();

jest.mock("google-map-react", () => (props: googleMapReact.Props) => {
  mockChildComponent(props);

  if (props.onGoogleApiLoaded !== undefined) {
    props.onGoogleApiLoaded({
      map: {},
      maps: {
        Marker: jest.fn(),
        MarkerImage: jest.fn(),
      },
      ref: null,
    });
  }

  return (
    <>
      {JSON.stringify(props)}
      <div
        data-testid="GMap_div_onClick_marker"
        onClick={() => {
          if (props.onClick !== undefined) {
            props.onClick({
              event: {
                target: { attributeStyleMap: { size: 19 } },
              },
              lat: 48.851,
              lng: 2.261,
            } as googleMapReact.ClickEventValue);
          }
        }}
      ></div>
      <div
        data-testid="GMap_div_onClick_map"
        onClick={() => {
          if (props.onClick !== undefined) {
            props.onClick({
              event: {
                target: { attributeStyleMap: { size: 13 } },
              },
            } as googleMapReact.ClickEventValue);
          }
        }}
      ></div>
      <input
        data-testid="GMap_input_zoom"
        onChange={(e) => {
          if (props.onChange !== undefined) {
            props.onChange({
              zoom: Number(e.target.value),
            } as googleMapReact.ChangeEventValue);
          }
        }}
      />
    </>
  );
});

describe("<MapGoogle/>", () => {
  describe("When its render", () => {
    it("should be displayed", () => {
      const scr = render(
        <MapGoogle
          stations={[]}
          idStationSelected={0}
          initZoom={0}
          initCenter={{
            lat: 0,
            lng: 0,
          }}
          onStationClick={jest.fn()}
        />
      );

      expect(scr.queryByTestId("MapGoogle_Container")).toBeInTheDocument();
      expect(
        scr.getByText(
          '{"bootstrapURLKeys":{"key":"AIzaSyDrehj4_m9JcFyhn1zMQFe6LvGyTUVQceY"},"zoom":0,"center":{"lat":0,"lng":0},"options":{"zoomControl":true,"controlSize":30,"mapTypeControl":true,"scaleControl":true,"streetViewControl":true,"rotateControl":true,"fullscreenControl":true}}'
        )
      ).toBeInTheDocument();
    });
  });

  describe("When its render with stations list and zoom", () => {
    it("should be displayed and call generate marker", async () => {
      const scr = render(
        <MapGoogle
          stations={[
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
          ]}
          idStationSelected={2}
          initZoom={0}
          initCenter={{
            lat: 0,
            lng: 0,
          }}
          onStationClick={jest.fn()}
        />
      );

      userEvent.type(scr.getByTestId("GMap_input_zoom"), "16");

      expect(markerMapMocked.prototype.clearMarkers).toBeCalled();
      expect(markerMapMocked.prototype.createMarker).toBeCalled();
    });
  });
  describe("When its render with stations list and dezoom", () => {
    it("should be displayed and call generate marker", async () => {
      const scr = render(
        <MapGoogle
          stations={[
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
          ]}
          idStationSelected={2}
          initZoom={0}
          initCenter={{
            lat: 0,
            lng: 0,
          }}
          onStationClick={jest.fn()}
        />
      );

      userEvent.type(scr.getByTestId("GMap_input_zoom"), "12");

      expect(markerMapMocked.prototype.clearMarkers).toBeCalled();
      expect(markerMapMocked.prototype.createMarker).not.toBeCalled();
    });
  });

  describe("When its render with stations list and click on a station", () => {
    it("should be ", async () => {
      const onStationClick = jest.fn();

      const scr = render(
        <MapGoogle
          stations={[
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
            {
              id: 3,
              name: "Bastille",
              lat: 48.86,
              lng: 2.289,
              capacity: 64,
            } as Station,
          ]}
          idStationSelected={2}
          initZoom={0}
          initCenter={{
            lat: 0,
            lng: 0,
          }}
          onStationClick={onStationClick}
        />
      );

      userEvent.click(scr.getByTestId("GMap_div_onClick_marker"));

      expect(onStationClick).toBeCalledWith({
        capacity: 23,
        id: 2,
        lat: 48.852,
        lng: 2.26,
        name: "Ledru rollin",
      } as Station);
    });
  });

  describe("When its render with stations list and click on a station", () => {
    it("should be ", async () => {
      const onStationClick = jest.fn();

      const scr = render(
        <MapGoogle
          stations={[]}
          idStationSelected={2}
          initZoom={0}
          initCenter={{
            lat: 0,
            lng: 0,
          }}
          onStationClick={onStationClick}
        />
      );

      userEvent.click(scr.getByTestId("GMap_div_onClick_map"));

      expect(onStationClick).not.toBeCalled();
    });
  });
});
