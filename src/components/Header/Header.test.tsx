import { render } from "@testing-library/react";
import wrapper from "../../helper/test-context-builder";
import Header from "./Header";

describe("<Header/>", () => {
  describe("When it's rendered", () => {
    it("should display titles", () => {
      const scr = render(<Header />, { wrapper });

      expect(scr.getByText("Velib forecast")).toBeInTheDocument();
    });
  });
});
