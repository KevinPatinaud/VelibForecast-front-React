import { Account } from "../../model/Account";
import { HttpService } from "../Http/Http.service";

export class AccountService {
  private httpService = new HttpService();

  async createAccount(account: Account, captchaToken: String) {
    this.httpService.post(window.location.origin + ":8083/createAccount", {
      account: account,
      captchaToken: captchaToken,
    });
  }
}
