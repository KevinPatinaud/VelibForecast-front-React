import { AxiosResponse } from "axios";
import { getServerURL } from "../../helper/Utils";
import { Account } from "../../model/Account";
import { HttpService } from "../Http/Http.service";
import { AccountService } from "./Account.service";

jest.mock("../Http/Http.service");

const httpService = HttpService as jest.MockedClass<typeof HttpService>;

httpService.prototype.post = jest
  .fn()
  .mockReturnValue({ data: { JWT: "JWT TOKEN" }, status: 200 } as AxiosResponse<
    any,
    any
  >);

httpService.prototype.put = jest
  .fn()
  .mockReturnValue({ data: { JWT: "JWT TOKEN" }, status: 200 } as AxiosResponse<
    any,
    any
  >);

httpService.prototype.get = jest
  .fn()
  .mockReturnValue({} as AxiosResponse<any, any>);

httpService.prototype.isAuthTokenSetted = jest.fn().mockReturnValue(false);

httpService.prototype.setAuthToken = jest.fn().mockReturnValue({});

describe("Account service", () => {
  describe("when createMailAccount service is called", () => {
    it("should call http service", () => {
      const accountService = new AccountService();
      accountService.createMailAccount({} as Account, "captcha token");

      expect(httpService.prototype.post).toHaveBeenCalledWith(
        getServerURL() + ":8083/MailUser",
        {
          email: undefined,
          password: undefined,
          captchaToken: "captcha token",
        }
      );
    });
  });

  describe("when connectMailAccount service is called", () => {
    it("should call http service", () => {
      const accountService = new AccountService();
      accountService.connectMailAccount(
        { email: "mail", password: "password" } as Account,
        "captcha token"
      );

      expect(httpService.prototype.put).toHaveBeenCalledWith(
        getServerURL() + ":8083/MailUser",
        {
          email: "mail",
          password: "password",
          captchaToken: "captcha token",
        }
      );
    });
  });

  describe("when createFacebookAccount service is called", () => {
    it("should call http service", () => {
      const accountService = new AccountService();
      accountService.createFacebookAccount("Token access");

      expect(httpService.prototype.post).toHaveBeenCalledWith(
        getServerURL() + ":8083/FacebookUser",
        {
          accessToken: "Token access",
        }
      );
    });
  });

  describe("when connectFacebookAccount service is called", () => {
    it("should call http service", () => {
      const accountService = new AccountService();
      accountService.connectFacebookAccount("Token access");

      expect(httpService.prototype.put).toHaveBeenCalledWith(
        getServerURL() + ":8083/FacebookUser",
        {
          accessToken: "Token access",
        }
      );
    });
  });

  describe("when isAccountExist service is called", () => {
    it("should call http service", () => {
      const accountService = new AccountService();
      accountService.isAccountExist("My_test_id");

      expect(httpService.prototype.get).toHaveBeenCalledWith(
        getServerURL() + ":8083/MailUser/exist?mail=My_test_id"
      );
    });
  });

  describe("when isAuthTokenSetted service is called", () => {
    it("should call http service", () => {
      const accountService = new AccountService();
      accountService.isAuthTokenSetted();

      expect(httpService.prototype.isAuthTokenSetted).toHaveBeenCalled();
    });
  });

  describe("when disconnect service is called", () => {
    it("should call http service", () => {
      const accountService = new AccountService();
      accountService.disconnect();

      expect(httpService.prototype.setAuthToken).toHaveBeenCalledWith();
    });
  });
});
