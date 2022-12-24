import { getServerURL } from "../../helper/Utils";
import { Account } from "../../model/Account";
import { HttpService } from "../Http/Http.service";

export class AccountService {
  private httpService = new HttpService();

  async createAccount(account: Account, captchaToken: String) {
    return (
      await this.httpService.post(getServerURL() + ":8083/MailUser", {
        email: account.email,
        password: account.password,
        captchaToken: captchaToken,
      })
    )?.data;
  }

  async createFacebookAccount(accessToken: String) {
    return (
      await this.httpService.post(getServerURL() + ":8083/FacebookUser", {
        accessToken: accessToken,
      })
    )?.data;
  }

  async isAccountExist(id: String) {
    return (
      await this.httpService.get(
        getServerURL() + ":8083/MailUserExist?id=" + id
      )
    )?.data;
  }
}
