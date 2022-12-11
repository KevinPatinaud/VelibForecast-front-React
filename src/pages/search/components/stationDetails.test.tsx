import { render } from "@testing-library/react";
import { Station } from "../../../model/Station";
import StationDetails from "./stationDetails";

describe("<StationDetails>", () => {
  describe("When is rendering", () => {
    it("should be displayed", () => {
      const tree = render(
        <StationDetails
          station={
            {
              id: 1,
              name: "Benjamin Godard - Victor Hugo",
              lat: 48.865983,
              lng: 2.275725,
              capacity: 35,
            } as Station
          }
        />
      );

      expect(tree).toMatchSnapshot();
    });
  });
});
