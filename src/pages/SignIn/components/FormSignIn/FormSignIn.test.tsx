import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Props as ReaptchaProps } from "reaptcha";
import wrapper from "../../../../helper/test-context-builder";
import AccountService from "../../../../services/Account/Account.service";
import FormSignIn from "./FormSignIn";
import FormSignUp from "./FormSignIn";

const mockChildComponent = jest.fn();

jest.mock("reaptcha", () => (props: ReaptchaProps) => {
  mockChildComponent(props);

  return (
    <>
      <div
        data-testid="reaptcha_onVerify"
        onClick={() => props.onVerify("token_validated_captcha")}
      />
      <div
        data-testid="reaptcha_onExpire"
        onClick={() => props.onExpire && props.onExpire()}
      />
    </>
  );
});

describe("Sign up page", () => {
  describe("When the sign in page render", () => {
    it("should display the formular", () => {
      const scr = render(<FormSignIn onSucceed={jest.fn} />, { wrapper });
      expect(scr.findByText("Email")).not.toBeNull();
      expect(scr.findByText("Mot de passe")).not.toBeNull();
      expect(scr.queryAllByRole("presentation")).not.toBeNull();
    });
  });
});
