import { Account } from "../../model/Account";
import { HttpService } from "../Http/Http.service";

export class AccountService {
  private httpService = new HttpService();

  async createAccount(account: Account, captchaToken: String) {
    this.httpService.post("http://localhost:8080/createAccount", {
      account: account,
      captchaToken: captchaToken,
    });
  }
}
