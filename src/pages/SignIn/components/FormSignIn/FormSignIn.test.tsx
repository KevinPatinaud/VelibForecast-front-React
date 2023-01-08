import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Props as ReaptchaProps } from "reaptcha";
import wrapper from "../../../../helper/test-context-builder";
import { AccountService } from "../../../../services/Account/Account.service";
import FormSignUp from "./FormSignIn";

jest.mock("../../../../services/Account/Account.service");

const accountServiceMocked = AccountService as jest.MockedClass<
  typeof AccountService
>;

beforeEach(() => {
  accountServiceMocked.mockClear();

  accountServiceMocked.prototype.createMailAccount = jest
    .fn()
    .mockReturnValue(Promise.resolve(true));

  accountServiceMocked.prototype.isAccountExist = jest
    .fn()
    .mockResolvedValue(Promise.resolve(false));
});

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
      const scr = render(<FormSignUp onSucceed={jest.fn} />, { wrapper });
      expect(scr.findByText("Email")).not.toBeNull();
      expect(
        scr.findByText("Mot de passe (doit contenir au moins 8 caractères)")
      ).not.toBeNull();
      expect(scr.findByText("Confirmez votre mot de passe")).not.toBeNull();
      expect(scr.queryAllByRole("presentation")).not.toBeNull();
    });
  });

  describe("When the user didn't complete the formular and click on submit", () => {
    it("should display an error message", () => {
      render(<FormSignUp onSucceed={jest.fn} />, { wrapper });
      userEvent.click(screen.getByText("Valider"));

      expect(
        screen.findByText("Merci de completer correctement le formulaire")
      ).not.toBeNull();
      expect(accountServiceMocked.prototype.createMailAccount).not.toBeCalled();
    });
  });
});
