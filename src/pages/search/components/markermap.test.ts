import MarkerMap from "./markermap.helper";

describe("Marker Map Helper", () => {
  describe("Create", () => {
    it("should create marker", () => {
      const markerMap = new MarkerMap();

      const maps = { Marker: jest.fn(), MarkerImage: jest.fn() };
      const map = {};

      markerMap.createMarker({ lat: 4.25, lng: 2.36 }, "myIcon.png", maps, map);

      expect(maps.Marker).toBeCalled();
      expect(maps.MarkerImage).toBeCalled();
    });
  });

  describe("Create", () => {
    it("should create marker", () => {
      const markerMap = new MarkerMap();

      const markers_1 = { setMap: jest.fn() };
      const markers_2 = { setMap: jest.fn() };

      markerMap.clearMarkers([markers_1, markers_2]);

      expect(markers_1.setMap).toBeCalled();
      expect(markers_2.setMap).toBeCalled();
    });
  });
});
