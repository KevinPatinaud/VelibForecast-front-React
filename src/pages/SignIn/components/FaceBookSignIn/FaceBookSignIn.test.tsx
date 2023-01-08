import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
  ReactFacebookLoginProps,
} from "react-facebook-login";
import wrapper from "../../../../helper/test-context-builder";
import { AccountService } from "../../../../services/Account/Account.service";
import FaceBookSignIn from "./FaceBookSignIn";

const mockChildComponent = jest.fn();

jest.mock("../../../../services/Account/Account.service");

const accountServiceMocked = AccountService as jest.MockedClass<
  typeof AccountService
>;

accountServiceMocked.prototype.connectFacebookAccount = jest
  .fn()
  .mockReturnValue(
    Promise.resolve({ status: 200, data: { JWT: "jwt token" } })
  );

accountServiceMocked.prototype.isAuthTokenSetted = jest
  .fn()
  .mockReturnValue(true);

jest.mock("react-facebook-login", () => (props: ReactFacebookLoginProps) => {
  mockChildComponent(props);

  return (
    <div
      data-testid="FacebookLogin"
      onClick={() =>
        props.callback({ accessToken: "accessToken" } as ReactFacebookLoginInfo)
      }
    >
      <div
        data-testid="FacebookLoginFail"
        onClick={() =>
          props.onFailure && props.onFailure({} as ReactFacebookFailureResponse)
        }
      />
      FacebookLogin
    </div>
  );
});

describe("<FaceBookSignIn>", () => {
  describe("When is rendered", () => {
    it("should display", () => {
      const scr = render(<FaceBookSignIn onSucceed={jest.fn()} />, { wrapper });
      expect(scr.queryByText("FacebookLogin")).toBeInTheDocument();
    });
  });

  describe("When the user logged correctly", () => {
    it("should execute the onSucceed function props", () => {
      const onSucceed = jest.fn();
      const scr = render(<FaceBookSignIn onSucceed={onSucceed} />, { wrapper });
      userEvent.click(scr.getByTestId("FacebookLogin"));

      expect(
        accountServiceMocked.prototype.connectFacebookAccount
      ).toHaveBeenCalledWith("accessToken");
    });
  });

  describe("When the user meet some difficulty to be logged", () => {
    it("should display en error message", () => {
      const logSpy = jest.spyOn(console, "log");

      const scr = render(<FaceBookSignIn onSucceed={jest.fn()} />, { wrapper });
      userEvent.click(scr.getByTestId("FacebookLoginFail"));

      expect(logSpy).toHaveBeenCalledWith("fail");
    });
  });
});
