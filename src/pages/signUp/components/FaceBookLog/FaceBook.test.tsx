import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
  ReactFacebookLoginProps,
} from "react-facebook-login";
import wrapper from "../../../../helper/test-context-builder";
import { Account } from "../../../../model/Account";
import AccountService from "../../../../services/Account/Account.service";
import FaceBookLog from "./FaceBookLog";

const mockChildComponent = jest.fn();

jest
  .spyOn(AccountService, "createFacebookAccount")
  .mockReturnValue(Promise.resolve({} as Account));

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

describe("<FaceBookLog>", () => {
  describe("When is rendered", () => {
    it("should display", () => {
      const scr = render(<FaceBookLog onSucceed={jest.fn()} />, { wrapper });
      expect(scr.queryByText("FacebookLogin")).toBeInTheDocument();
    });
  });

  describe("When the user logged correclty", () => {
    it("to define", () => {
      const scr = render(<FaceBookLog onSucceed={jest.fn()} />, { wrapper });
      userEvent.click(scr.getByTestId("FacebookLogin"));

      expect(AccountService.createFacebookAccount).toHaveBeenCalledWith(
        "accessToken"
      );
    });
  });
});
