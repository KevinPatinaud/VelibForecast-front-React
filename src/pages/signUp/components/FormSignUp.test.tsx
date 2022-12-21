import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Props as ReaptchaProps } from "reaptcha";
import { AccountService } from "../../../services/Account/Account.service";
import wrapper from "../../../helper/test-context-builder";
import FormSignUp from "./FormSignUp";

jest.mock("../../../services/Account/Account.service");

const accountServiceMocked = AccountService as jest.MockedClass<
  typeof AccountService
>;

accountServiceMocked.prototype.createAccount.mockResolvedValue();

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
      render(<FormSignUp />, { wrapper });
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
      render(<FormSignUp />, { wrapper });
      userEvent.click(screen.getByText("Valider"));

      expect(
        screen.queryByText("Merci de completer correctement le formulaire")
      ).not.toBeNull();
      expect(accountServiceMocked.prototype.createAccount).not.toBeCalled();
    });
  });

  describe("When the user close the information modal", () => {
    it("should hidde the modal", () => {
      const scr = render(<FormSignUp />, { wrapper });
      userEvent.click(screen.getByText("Valider"));

      expect(
        screen.queryByText("Merci de completer correctement le formulaire")
      ).not.toBeNull();

      userEvent.click(scr.getByTestId("button_close"));

      expect(
        screen.queryByText("Merci de completer correctement le formulaire")
      ).toBeNull();

      expect(accountServiceMocked.prototype.createAccount).not.toBeCalled();
    });
  });

  describe("When the user set two different password", () => {
    it("should display an specific error message", async () => {
      const scr = render(<FormSignUp />, { wrapper });

      userEvent.type(screen.getByTestId("input_password"), "myPassword");

      userEvent.type(screen.getByTestId("input_password2"), "password");

      fireEvent.blur(scr.getByTestId("input_password2"));

      expect(accountServiceMocked.prototype.createAccount).not.toBeCalled();
      expect(
        screen.queryByText("Les deux mots de passe sont différents")
      ).not.toBeNull();
    });
  });
  describe("When the user well complet the formular and click on submit", () => {
    it("should send the formular to the back-end", () => {
      render(<FormSignUp />, { wrapper });

      userEvent.type(screen.getByTestId("input_email"), "Benabar@musique.fr");
      userEvent.type(screen.getByTestId("input_password"), "myPassword");
      userEvent.type(screen.getByTestId("input_password2"), "myPassword");

      userEvent.click(screen.getByTestId("reaptcha_onVerify"));

      userEvent.click(screen.getByText("Valider"));

      expect(accountServiceMocked.prototype.createAccount).toBeCalledWith(
        {
          email: "Benabar@musique.fr",
          password: "myPassword",
        },
        "token_validated_captcha"
      );

      expect(
        screen.queryByText("Merci de completer correctement le formulaire")
      ).not.toBeInTheDocument();
    });
  });

  describe("When the captcha is expired", () =>
    it("should displayed the default warning message", () => {
      render(<FormSignUp />, { wrapper });

      userEvent.click(screen.getByTestId("reaptcha_onVerify"));

      userEvent.click(screen.getByTestId("reaptcha_onExpire"));

      userEvent.click(screen.getByText("Valider"));

      expect(
        screen.queryByText("Merci de completer correctement le formulaire")
      ).toBeInTheDocument();
    }));
});
