import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Props as ReaptchaProps } from "reaptcha";
import wrapper from "../../../../helper/test-context-builder";
import { AccountService } from "../../../../services/Account/Account.service";
import FormSignUp from "./FormSignUp";

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
      render(<FormSignUp onSucceed={jest.fn} />, { wrapper });
      expect(screen.queryByText("Email")).not.toBeNull();
      expect(
        screen.queryByText("Mot de passe (doit contenir au moins 8 caractères)")
      ).not.toBeNull();
      expect(screen.queryByText("Confirmez votre mot de passe")).not.toBeNull();
      expect(screen.queryAllByRole("presentation")).not.toBeNull();
    });
  });

  describe("When the user didn't complete the formular and click on submit", () => {
    it("should display an error message", () => {
      render(<FormSignUp onSucceed={jest.fn} />, { wrapper });
      userEvent.click(screen.getByText("Valider"));

      expect(
        screen.queryByText("Merci de completer correctement le formulaire")
      ).not.toBeNull();
      expect(accountServiceMocked.prototype.createMailAccount).not.toBeCalled();
    });
  });

  describe("When the user close the information modal", () => {
    it("should hidde the modal", async () => {
      const scr = render(<FormSignUp onSucceed={jest.fn} />, {
        wrapper,
      });
      userEvent.click(screen.getByText("Valider"));

      expect(
        screen.queryByText("Merci de completer correctement le formulaire")
      ).not.toBeNull();

      userEvent.click(scr.getByTestId("button_close"));

      expect(
        screen.queryByText("Merci de completer correctement le formulaire")
      ).toBeNull();

      expect(accountServiceMocked.prototype.createMailAccount).not.toBeCalled();
    });
  });

  describe("When the user set two different password", () => {
    it("should display an specific error message", async () => {
      const scr = render(<FormSignUp onSucceed={jest.fn} />, {
        wrapper,
      });

      userEvent.type(screen.getByTestId("input_password"), "myPassword");

      userEvent.type(screen.getByTestId("input_password2"), "password");

      fireEvent.blur(scr.getByTestId("input_password2"));

      expect(accountServiceMocked.prototype.createMailAccount).not.toBeCalled();
      expect(
        screen.queryByText("Les deux mots de passe sont différents")
      ).not.toBeNull();
    });
  });

  describe("When the captcha is expired", () =>
    it("should displayed the default warning message", async () => {
      render(<FormSignUp onSucceed={jest.fn} />, { wrapper });

      userEvent.click(screen.getByTestId("reaptcha_onVerify"));
      userEvent.click(screen.getByTestId("reaptcha_onExpire"));
      userEvent.click(screen.getByText("Valider"));

      expect(
        screen.queryByText("Merci de completer correctement le formulaire")
      ).toBeInTheDocument();
    }));
});
