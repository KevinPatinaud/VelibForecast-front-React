import { AxiosResponse } from "axios";
import { getServerURL } from "../../helper/Utils";
import { Account } from "../../model/Account";
import { HttpService } from "../Http/Http.service";
import { AccountService } from "./Account.service";

jest.mock("../Http/Http.service");

const httpService = HttpService as jest.MockedClass<typeof HttpService>;

httpService.prototype.post = jest
  .fn()
  .mockReturnValue({} as AxiosResponse<any, any>);

httpService.prototype.get = jest
  .fn()
  .mockReturnValue({} as AxiosResponse<any, any>);

describe("Account service", () => {
  describe("when createAccount service is called", () => {
    it("should call http service", () => {
      const accountService = new AccountService();
      accountService.createAccount({} as Account, "captcha token");

      expect(httpService.prototype.post).toHaveBeenCalledWith(
        getServerURL() + ":8083/MailUser",
        {
          email: undefined,
          password: undefined,
          captchaToken: "captcha token",
        }
      );
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

    describe("when isAccountExist service is called", () => {
      it("should call http service", () => {
        const accountService = new AccountService();
        accountService.isAccountExist("My_test_id");

        expect(httpService.prototype.get).toHaveBeenCalledWith(
          getServerURL() + ":8083/MailUserExist?id=My_test_id"
        );
      });
    });
  });
});
