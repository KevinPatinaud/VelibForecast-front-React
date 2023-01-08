import { render } from "@testing-library/react";
import wrapper from "../../helper/test-context-builder";
import InformationLegal from "./informationLegal";

describe("<InformationLegal>", () => {
  describe("When its render", () => {
    it("should match snapshot", () => {
      const scr = render(<InformationLegal />, { wrapper });
      expect(scr).toMatchSnapshot();
    });
  });
});
