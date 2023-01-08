import { AxiosResponse } from "axios";
import { getServerURL } from "../../helper/Utils";
import { Account } from "../../model/Account";
import { HttpService } from "../Http/Http.service";

export class AccountService {
  private httpService = new HttpService();

  async connectMailAccount(account: Account, captchaToken: String) {
    const result = await this.httpService.put(
      getServerURL() + ":8083/MailUser",
      {
        email: account.email,
        password: account.password,
        captchaToken: captchaToken,
      }
    );

    return this.interpretConection(result);
  }
  async connectFacebookAccount(accessToken: String) {
    const result = await this.httpService.put(
      getServerURL() + ":8083/FacebookUser",
      {
        accessToken: accessToken,
      }
    );

    return this.interpretConection(result);
  }

  async createMailAccount(account: Account, captchaToken: String) {
    const result = await this.httpService.post(
      getServerURL() + ":8083/MailUser",
      {
        email: account.email,
        password: account.password,
        captchaToken: captchaToken,
      }
    );

    return this.interpretConection(result);
  }

  async createFacebookAccount(accessToken: String) {
    const result = await this.httpService.post(
      getServerURL() + ":8083/FacebookUser",
      {
        accessToken: accessToken,
      }
    );

    return this.interpretConection(result);
  }

  private interpretConection(result: AxiosResponse<any, any>) {
    if (result === undefined || result.status === undefined) return null;

    if (result.status === 200) {
      this.httpService.setAuthToken(result?.data.JWT);
      return result?.data;
    } else return result.status;
  }

  async isAccountExist(id: String) {
    return (
      await this.httpService.get(
        getServerURL() + ":8083/MailUser/exist?mail=" + id
      )
    )?.data;
  }

  isAuthTokenSetted() {
    return this.httpService.isAuthTokenSetted();
  }

  disconnect() {
    this.httpService.setAuthToken();
  }
}
