import { render } from "@testing-library/react";
import wrapper from "../../helper/test-context-builder";
import NotFound from "./NotFound";

describe("", () => {
  describe("", () => {
    it("", () => {
      const scr = render(<NotFound />, { wrapper });
      expect(scr).toMatchSnapshot();
    });
  });
});
