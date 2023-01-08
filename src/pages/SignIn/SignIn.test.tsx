import { render, screen } from "@testing-library/react";
import wrapper from "../../helper/test-context-builder";
import SignIn from "./SignIn";

describe("<SignIn/>", () => {
  describe("When is rendered", () => {
    it("should be displayed", () => {
      const scr = render(<SignIn />, { wrapper });
    });
  });
});
