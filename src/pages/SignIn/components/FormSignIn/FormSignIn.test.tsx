import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Props as ReaptchaProps } from "reaptcha";
import wrapper from "../../../../helper/test-context-builder";
import { Account } from "../../../../model/Account";
import AccountService from "../../../../services/Account/Account.service";
import FormSignIn from "./FormSignIn";

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

describe("Sign in page", () => {
  describe("When the sign in page render", () => {
    it("should display the formular", () => {
      const scr = render(<FormSignIn onSucceed={jest.fn} />, { wrapper });
      expect(scr.findByText("Email")).not.toBeNull();
      expect(scr.findByText("Mot de passe")).not.toBeNull();
      expect(scr.queryAllByRole("presentation")).not.toBeNull();
    });
  });

  describe("when the form is submitted and is valide", () => {
    it("should call AccountService.connectMailAccount", async () => {
      jest
        .spyOn(AccountService, "connectMailAccount")
        .mockResolvedValue({} as Account);

      jest.spyOn(AccountService, "isAuthTokenSetted").mockReturnValue(true);

      const succeedFnc = jest.fn();
      const scr = render(<FormSignIn onSucceed={succeedFnc} />, { wrapper });

      fireEvent.change(scr.getByTestId("input_email"), {
        target: { value: "fake@mail.com" },
      });

      fireEvent.change(scr.getByTestId("input_password"), {
        target: { value: "password_top_secret" },
      });

      userEvent.click(scr.getByText("Valider"));

      expect(AccountService.connectMailAccount).toBeCalledWith({
        email: "fake@mail.com",
        password: "password_top_secret",
      });

      await waitFor(() =>
        expect(AccountService.isAuthTokenSetted).toBeCalled()
      );

      await waitFor(() => expect(succeedFnc).toHaveBeenCalled());
    });
  });

  describe("when the form is submitted and is invalide code 401", () => {
    it("should call AccountService.connectMailAccount", async () => {
      jest.spyOn(AccountService, "connectMailAccount").mockResolvedValue(401);

      jest.spyOn(AccountService, "isAuthTokenSetted").mockReturnValue(true);

      const succeedFnc = jest.fn();
      const scr = render(<FormSignIn onSucceed={succeedFnc} />, { wrapper });

      fireEvent.change(scr.getByTestId("input_email"), {
        target: { value: "fake@mail.com" },
      });

      fireEvent.change(scr.getByTestId("input_password"), {
        target: { value: "password_top_secret" },
      });

      userEvent.click(scr.getByText("Valider"));

      expect(AccountService.connectMailAccount).toBeCalledWith({
        email: "fake@mail.com",
        password: "password_top_secret",
      });

      expect(AccountService.isAuthTokenSetted).not.toBeCalled();

      expect(succeedFnc).not.toHaveBeenCalled();
    });
  });

  describe("when the form is submitted and is invalide code 404", () => {
    it("should call AccountService.connectMailAccount", async () => {
      jest.spyOn(AccountService, "connectMailAccount").mockResolvedValue(404);

      jest.spyOn(AccountService, "isAuthTokenSetted").mockReturnValue(true);

      const succeedFnc = jest.fn();
      const scr = render(<FormSignIn onSucceed={succeedFnc} />, { wrapper });

      fireEvent.change(scr.getByTestId("input_email"), {
        target: { value: "fake@mail.com" },
      });

      fireEvent.change(scr.getByTestId("input_password"), {
        target: { value: "password_top_secret" },
      });

      userEvent.click(scr.getByText("Valider"));

      expect(AccountService.connectMailAccount).toBeCalledWith({
        email: "fake@mail.com",
        password: "password_top_secret",
      });

      expect(AccountService.isAuthTokenSetted).not.toBeCalled();

      expect(succeedFnc).not.toHaveBeenCalled();
    });
  });
});
