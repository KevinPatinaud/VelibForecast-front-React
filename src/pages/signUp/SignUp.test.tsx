import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import wrapper from "../../helper/test-context-builder";
import { FaceBookLogProps } from "./components/FaceBookLog/FaceBookLog";
import { FormSignUpProps } from "./components/FormSignUp/FormSignUp";
import SignUp from "./SignUp";

const mockChildComponent = jest.fn();

jest.mock(
  "./components/FormSignUp/FormSignUp",
  () => (props: FormSignUpProps) => {
    mockChildComponent(props);

    return (
      <div data-testid="FormSignUp" onClick={props.onSucceed}>
        FormSignUp
      </div>
    );
  }
);

jest.mock(
  "./components/FaceBookLog/FaceBookLog",
  () => (props: FaceBookLogProps) => {
    return (
      <div data-testid="FaceBookLog" onClick={() => props.onSucceed()}>
        FaceBookLog
      </div>
    );
  }
);

describe("<SignUp>", () => {
  describe("When is rendered", () => {
    it("should display mail and Facebook form", () => {
      const scr = render(<SignUp />, { wrapper });
      expect(scr.queryByText("FormSignUp")).toBeInTheDocument();
      expect(scr.queryByText("FaceBookLog")).toBeInTheDocument();
    });
  });

  describe("When the mail form succed", () => {
    it("", () => {
      const scr = render(<SignUp />, { wrapper });
      userEvent.click(scr.getByTestId("FormSignUp"));
    });
  });

  describe("When the facebook form succed", () => {
    it("", () => {
      const scr = render(<SignUp />, { wrapper });
      userEvent.click(scr.getByTestId("FaceBookLog"));
    });
  });
});
