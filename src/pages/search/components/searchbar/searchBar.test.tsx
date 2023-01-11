import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Station } from "../../../../model/Station";
import SearchBar from "./searchBar";

describe("<SearchBar/>", () => {
  describe("When its rendering with no stations", () => {
    it("should be displayed", () => {
      const scr = render(
        <SearchBar
          placeHolder={"placeholder test"}
          stations={[]}
          onSelect={() => {}}
        />
      );

      expect(
        scr.queryByPlaceholderText("placeholder test")
      ).toBeInTheDocument();

      expect(scr.getByTestId("searchBar_container")).toBeInTheDocument();

      fireEvent.focus(scr.getByTestId("searchBar_container"));

      expect(scr.queryByText("No results found")).not.toBeInTheDocument();
    });
  });

  describe("When the user type a station name", () => {
    it("should displayed corresponding stations list", () => {
      const scr = render(
        <SearchBar
          placeHolder={"placeholder test"}
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
          onSelect={() => {}}
        />
      );

      fireEvent.focus(scr.getByTestId("searchBar_container"));

      expect(scr.queryByText("Bastille")).toBeInTheDocument();
      expect(scr.queryByText("Eiffel tower")).not.toBeInTheDocument();

      userEvent.type(scr.getByTestId("searchbar_input"), "Bas");
      expect(scr.queryByText("Bastille")).toBeInTheDocument();
      fireEvent.change(scr.getByTestId("searchbar_input"), {
        target: { value: "" },
      });

      userEvent.type(scr.getByTestId("searchbar_input"), "Bastouille");
      expect(scr.queryByText("Bastille")).not.toBeInTheDocument();
      fireEvent.change(scr.getByTestId("searchbar_input"), {
        target: { value: "" },
      });

      userEvent.type(scr.getByTestId("searchbar_input"), "Bastille");
      expect(scr.queryByText("Bastille")).toBeInTheDocument();
      fireEvent.change(scr.getByTestId("searchbar_input"), {
        target: { value: "" },
      });
    });
  });

  describe("When the user mouse leave", () => {
    it("should hidde stations list", () => {
      const scr = render(
        <SearchBar
          placeHolder={"placeholder test"}
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
          onSelect={() => {}}
        />
      );

      fireEvent.focus(scr.getByTestId("searchBar_container"));

      expect(scr.queryByText("Bastille")).toBeInTheDocument();
      expect(scr.queryByText("Eiffel tower")).not.toBeInTheDocument();

      fireEvent.mouseLeave(scr.getByTestId("searchBar_container"));

      expect(scr.queryByText("Bastille")).not.toBeInTheDocument();
      expect(scr.queryByText("Eiffel tower")).not.toBeInTheDocument();
    });
  });

  describe("When the user select a station", () => {
    it("should execute onSelect with this station", () => {
      const onSelect = jest.fn();

      const scr = render(
        <SearchBar
          placeHolder={"placeholder test"}
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
          onSelect={onSelect}
        />
      );

      fireEvent.focus(scr.getByTestId("searchBar_container"));

      userEvent.click(scr.getByText("Bastille"));

      expect(onSelect).toBeCalledWith({
        capacity: 64,
        id: 3,
        lat: 48.86,
        lng: 2.289,
        name: "Bastille",
      } as Station);
    });
  });
});
