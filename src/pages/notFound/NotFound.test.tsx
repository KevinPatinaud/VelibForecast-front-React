import { render } from "@testing-library/react";
import wrapper from "../../helper/test-context-builder";
import NotFound from "./NotFound";

describe("<NotFound>", () => {
  describe("When it's render", () => {
    it("should match snapshot", () => {
      const scr = render(<NotFound />, { wrapper });
      expect(scr).toMatchSnapshot();
    });
  });
});
