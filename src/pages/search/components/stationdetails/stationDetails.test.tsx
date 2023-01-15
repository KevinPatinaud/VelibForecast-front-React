import { render } from "@testing-library/react";
import { Station } from "../../../../model/Station";
import StationDetails from "./stationDetails";
import wrapper from "../../../../helper/test-context-builder";
import StationService from "../../../../services/Station/Station.service";
import { StationState } from "../../../../model/StationState";
import { AccountContext } from "../../../../provider/AccountProvider";
import { Account } from "../../../../model/Account";
import userEvent from "@testing-library/user-event";
import AccountService from "../../../../services/Account/Account.service";

jest
  .spyOn(StationService, "getStatusInFutur")
  .mockResolvedValue({} as StationState);

describe("<StationDetails>", () => {
  describe("When is rendering", () => {
    it("should be displayed", () => {
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
          <StationDetails
            station={
              {
                id: 123,
                name: "Benjamin Godard - Victor Hugo",
                lat: 48.865983,
                lng: 2.275725,
                capacity: 35,
              } as Station
            }
          />
        </AccountContext.Provider>,
        { wrapper }
      );

      expect(scr).toMatchSnapshot();
    });
  });

  describe("When the user click on the add to favorite button", () => {
    it("should make a api call", () => {
      jest
        .spyOn(AccountService, "addFavoriteStation")
        .mockImplementation(() => {});

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
          <StationDetails
            station={
              {
                id: 789,
                name: "Benjamin Godard - Victor Hugo",
                lat: 48.865983,
                lng: 2.275725,
                capacity: 35,
              } as Station
            }
          />
        </AccountContext.Provider>,
        { wrapper }
      );

      userEvent.click(scr.getByTestId("add_fav_station"));

      expect(AccountService.addFavoriteStation).toHaveBeenCalledWith({
        capacity: 35,
        id: 789,
        lat: 48.865983,
        lng: 2.275725,
        name: "Benjamin Godard - Victor Hugo",
      });
    });
  });

  describe("When the user click on the remove favorite button", () => {
    it("should make an api call", () => {
      jest
        .spyOn(AccountService, "removeFavoriteStation")
        .mockImplementation(() => {});

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
          <StationDetails
            station={
              {
                id: 123,
                name: "Benjamin Godard - Victor Hugo",
                lat: 48.865983,
                lng: 2.275725,
                capacity: 35,
              } as Station
            }
          />
        </AccountContext.Provider>,
        { wrapper }
      );

      userEvent.click(scr.getByTestId("remove_fav_station"));

      expect(AccountService.removeFavoriteStation).toHaveBeenCalledWith({
        capacity: 35,
        id: 123,
        lat: 48.865983,
        lng: 2.275725,
        name: "Benjamin Godard - Victor Hugo",
      });
    });
  });
});
