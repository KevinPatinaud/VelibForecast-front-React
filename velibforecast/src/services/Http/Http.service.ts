import axios from "axios";

export class HttpService {
  async get(url: string) {
    return await axios.get(url);
  }

  async post(url: string, data: any) {
    return await axios.post(url, data);
  }
}
