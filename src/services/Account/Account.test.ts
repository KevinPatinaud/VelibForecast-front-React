import { AxiosResponse } from "axios";
import { Account } from "../../model/Account";
import { HttpService } from "../Http/Http.service";
import { AccountService } from "./Account.service";

jest.mock("../Http/Http.service");

const httpService = HttpService as jest.MockedClass<typeof HttpService>;

httpService.prototype.post = jest
  .fn()
  .mockReturnValue({} as AxiosResponse<any, any>);

describe("Account service", () => {
  describe("when service is called", () => {
    it("should call http service", () => {
      const accountService = new AccountService();
      accountService.createAccount({} as Account, "captcha token");

      expect(httpService.prototype.post).toHaveBeenCalledWith(
        window.location.origin + ":8083/createAccount",
        {
          account: {},
          captchaToken: "captcha token",
        }
      );
    });
  });
});
