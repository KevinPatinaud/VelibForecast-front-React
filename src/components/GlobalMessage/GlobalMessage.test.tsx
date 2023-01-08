import { render } from "@testing-library/react";
import wrapper from "../../helper/test-context-builder";
import GlobalMessage from "./GlobalMessage";

describe("<GlobalMessage/>", () => {
  describe("when is rendered whith a message", () => {
    it("should display message", () => {
      jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => ({
          pathname: "localhost:3000/",
          state: { message: "The global message" },
        }),
      }));

      const scr = render(<GlobalMessage />, { wrapper });
      expect(scr.findByText("The global message")).not.toBeNull();
    });
  });

  describe("when is rendered whithout a message", () => {
    it("shouldn't display message", () => {
      jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => ({
          pathname: "localhost:3000/",
        }),
      }));

      const scr = render(<GlobalMessage />, { wrapper });
      expect(scr.queryByText("The global message")).toBeNull();
    });
  });
});
