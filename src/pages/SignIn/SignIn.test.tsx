import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import wrapper from "../../helper/test-context-builder";
import { FormSignInProps } from "./components/FormSignIn/FormSignIn";
import SignIn from "./SignIn";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

const mockChildComponent = jest.fn();

jest.mock(
  "./components/FormSignIn/FormSignIn",
  () => (props: FormSignInProps) => {
    mockChildComponent(props);

    return (
      <div data-testid="FormSignIn" onClick={() => props.onSucceed()}>
        FormSignIn
      </div>
    );
  }
);

jest.mock(
  "./components/FaceBookSignIn/FaceBookSignIn",
  () => (props: FormSignInProps) => {
    mockChildComponent(props);

    return (
      <div data-testid="FaceBookSignIn" onClick={() => props.onSucceed()}>
        FaceBookSignIn
      </div>
    );
  }
);

describe("<SignIn/>", () => {
  describe("When is rendered", () => {
    it("should be displayed", () => {
      const scr = render(<SignIn />, { wrapper });

      expect(scr.getByText("FormSignIn")).toBeInTheDocument();
      expect(scr.getByText("FaceBookSignIn")).toBeInTheDocument();
    });
  });

  describe("When FormSignIn succeed", () => {
    it("should execute the corresponding function", () => {
      const scr = render(<SignIn />, { wrapper });

      userEvent.click(scr.getByTestId("FormSignIn"));

      expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
    });
  });

  describe("When FaceBookSignIn succeed", () => {
    it("should execute the corresponding function", () => {
      const scr = render(<SignIn />, { wrapper });

      userEvent.click(scr.getByTestId("FaceBookSignIn"));

      expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
    });
  });
});
