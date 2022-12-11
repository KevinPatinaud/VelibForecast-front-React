import { render, screen } from "@testing-library/react";
import SignIn from "./SignIn";

describe("<SignIn/>", () => {
  describe("When is rendered", () => {
    it("should be displayed", () => {
      const scr = render(<SignIn />);
      expect(scr.getByTestId("SignIn_div")).toBeInTheDocument();
    });
  });
});
