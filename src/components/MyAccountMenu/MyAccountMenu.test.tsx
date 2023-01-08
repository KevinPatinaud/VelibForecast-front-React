import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import wrapper from "../../helper/test-context-builder";
import { Account } from "../../model/Account";
import AccountProvider, {
  AccountContext,
} from "../../provider/AccountProvider";
import { AccountService } from "../../services/Account/Account.service";
import MyAccountMenu from "./MyAccountMenu";

const accountService = AccountService as jest.MockedClass<
  typeof AccountService
>;

accountService.prototype.disconnect = jest.fn().mockReturnValue({});

describe("<MyAccountMenu/>", () => {
  describe("when is rendered and the user isn't logged and mouse hover and exit", () => {
    it("should display icon", async () => {
      const scr = render(
        <AccountContext.Provider
          value={{
            account: { isConnected: false } as Account,
            setAccount: (account: Account) => jest.fn(),
          }}
        >
          <MyAccountMenu />
        </AccountContext.Provider>,
        { wrapper }
      );
      expect(screen.getByTestId("div_MyAccount")).toBeInTheDocument();

      userEvent.hover(screen.getByTestId("div_MyAccount"));

      expect(scr.queryByText("Créer un compte")).toBeInTheDocument();

      userEvent.unhover(screen.getByTestId("div_MyAccount"));

      expect(scr.queryByText("Créer un compte")).not.toBeInTheDocument();
    });
  });

  describe("when is rendered and the user isn't logged and mouse hover and exit from not logged menu", () => {
    it("should display icon", async () => {
      const scr = render(
        <AccountContext.Provider
          value={{
            account: { isConnected: false } as Account,
            setAccount: (account: Account) => jest.fn(),
          }}
        >
          <MyAccountMenu />
        </AccountContext.Provider>,
        { wrapper }
      );
      expect(screen.getByTestId("div_MyAccount")).toBeInTheDocument();

      userEvent.hover(screen.getByTestId("div_MyAccount"));

      expect(scr.queryByText("Créer un compte")).toBeInTheDocument();

      userEvent.unhover(screen.getByTestId("div_user_menu_not_connected"));

      expect(scr.queryByText("Créer un compte")).not.toBeInTheDocument();
    });
  });

  describe("when is rendered and the user is logged and mouse hover and exit", () => {
    it("should display icon", async () => {
      const scr = render(
        <AccountContext.Provider
          value={{
            account: { isConnected: true } as Account,
            setAccount: (account: Account) => jest.fn(),
          }}
        >
          <MyAccountMenu />
        </AccountContext.Provider>,
        { wrapper }
      );
      expect(screen.getByTestId("div_MyAccount")).toBeInTheDocument();

      userEvent.hover(screen.getByTestId("div_MyAccount"));

      expect(scr.queryByText("Me déconnecter")).toBeInTheDocument();

      userEvent.hover(screen.getByTestId("div_user_menu_connected"));
      userEvent.unhover(screen.getByTestId("div_user_menu_connected"));

      expect(scr.queryByText("Me déconnecter")).not.toBeInTheDocument();
    });
  });

  describe("when is rendered and the user is logged and mouse hover and exit", () => {
    it("should display icon", async () => {
      const scr = render(
        <AccountContext.Provider
          value={{
            account: { isConnected: true } as Account,
            setAccount: (account: Account) => jest.fn(),
          }}
        >
          <MyAccountMenu />
        </AccountContext.Provider>,
        { wrapper }
      );
      expect(screen.getByTestId("div_MyAccount")).toBeInTheDocument();

      userEvent.hover(screen.getByTestId("div_MyAccount"));

      expect(scr.queryByText("Me déconnecter")).toBeInTheDocument();

      userEvent.click(await scr.findByText("Me déconnecter"));

      expect(accountService.prototype.disconnect).toHaveBeenCalled();
    });
  });
});
