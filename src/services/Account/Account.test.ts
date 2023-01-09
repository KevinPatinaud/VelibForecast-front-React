import { AxiosResponse } from "axios";
import { getServerURL } from "../../helper/Utils";
import { Account } from "../../model/Account";
import HttpService from "../Http/Http.service";
import AccountService from "./Account.service";

jest.spyOn(HttpService, "post").mockImplementation(() => {
  return Promise.resolve({
    data: { JWT: "JWT TOKEN" },
    status: 200,
  } as AxiosResponse<any, any>);
});

jest.spyOn(HttpService, "put").mockImplementation(() => {
  return Promise.resolve({
    data: { JWT: "JWT TOKEN" },
    status: 200,
  } as AxiosResponse<any, any>);
});

jest.spyOn(HttpService, "get").mockImplementation(() => {
  return Promise.resolve({
    data: { JWT: "JWT TOKEN" },
    status: 200,
  } as AxiosResponse<any, any>);
});

jest.spyOn(HttpService, "isAuthTokenSetted").mockImplementation(() => {
  return false;
});

jest.spyOn(HttpService, "setAuthToken").mockImplementation();

describe("Account service", () => {
  describe("when createMailAccount service is called", () => {
    it("should call http service", () => {
      AccountService.createMailAccount({} as Account, "captcha token");

      expect(HttpService.post).toHaveBeenCalledWith(
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
      AccountService.connectMailAccount(
        { email: "mail", password: "password" } as Account,
        "captcha token"
      );

      expect(HttpService.put).toHaveBeenCalledWith(
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
      AccountService.createFacebookAccount("Token access");

      expect(HttpService.post).toHaveBeenCalledWith(
        getServerURL() + ":8083/FacebookUser",
        {
          accessToken: "Token access",
        }
      );
    });
  });

  describe("when connectFacebookAccount service is called", () => {
    it("should call http service", () => {
      AccountService.connectFacebookAccount("Token access");

      expect(HttpService.put).toHaveBeenCalledWith(
        getServerURL() + ":8083/FacebookUser",
        {
          accessToken: "Token access",
        }
      );
    });
  });

  describe("when isAccountExist service is called", () => {
    it("should call http service", () => {
      AccountService.isAccountExist("My_test_id");

      expect(HttpService.get).toHaveBeenCalledWith(
        getServerURL() + ":8083/MailUser/exist?mail=My_test_id"
      );
    });
  });

  describe("when disconnect service is called", () => {
    it("should call http service", () => {
      AccountService.disconnect();

      expect(HttpService.setAuthToken).toHaveBeenCalledWith();
    });
  });
});
