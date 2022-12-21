import wrapper from "../../helper/test-context-builder";
import { render } from "@testing-library/react";
import SignUp from "./SignUp";

jest.mock("./components/FormSignUp", () => () => {
  return <>FormSignUp</>;
});

describe("Sign up page", () => {
  describe("When the page render", () => {
    it("should display content", () => {
      const scr = render(<SignUp />, { wrapper });

      expect(scr.queryByText("FormSignUp")).toBeInTheDocument();
    });
  });
});
