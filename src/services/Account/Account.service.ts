import { getServerURL } from "../../helper/Utils";
import { Account } from "../../model/Account";
import { HttpService } from "../Http/Http.service";

export class AccountService {
  private httpService = new HttpService();

  async createAccount(account: Account, captchaToken: String) {
    return this.httpService.post(getServerURL() + ":8083/MailUser", {
      email: account.email,
      password: account.password,
      captchaToken: captchaToken,
    });
  }

  async isAccountExist(id: String) {
    return this.httpService.get(
      getServerURL() + ":8083/MailUserExist?id=" + id
    );
  }
}
