import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Account } from "../../../../model/Account";
import { Station } from "../../../../model/Station";
import { StationState } from "../../../../model/StationState";
import { AccountContext } from "../../../../provider/AccountProvider";
import FavoriteStations from "./FavoriteStations";

describe("<FavoriteStations/>", () => {
  describe("when its rendered", () => {
    it("should match snapshot", () => {
      const scr = render(<FavoriteStations onSelect={jest.fn()} />);
      expect(scr).toMatchSnapshot();
    });
  });

  describe("when a station is selected", () => {
    it("should call onSelect with his id", () => {
      const onSelected = jest.fn();

      const scr = render(
        <AccountContext.Provider
          value={{
            account: {
              isConnected: true,
              favoriteStations: [
                {
                  id: 123,
                  name: "123",
                  lat: 12,
                  lng: 42,
                  capacity: 25,
                  state: {} as StationState,
                } as Station,
                {
                  id: 456,
                  name: "456",
                  lat: 12,
                  lng: 42,
                  capacity: 25,
                  state: {} as StationState,
                } as Station,
              ],
            } as Account,
            setAccount: jest.fn(),
          }}
        >
          <FavoriteStations idStationSelected={456} onSelect={onSelected} />
        </AccountContext.Provider>
      );
      expect(scr.getByText("123")).toBeInTheDocument();
      expect(scr.getByText("456")).toBeInTheDocument();

      userEvent.click(scr.getByText("123"));

      expect(onSelected).toHaveBeenCalled();
    });
  });
});
