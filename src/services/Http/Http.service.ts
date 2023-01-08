import axios from "axios";

export class HttpService {
  constructor() {
    if (localStorage.getItem("Authorization")) {
      this.setAuthToken(localStorage.getItem("Authorization") as string);
    }
  }

  async get(url: string) {
    return await axios.get(url);
  }

  async post(url: string, data: any) {
    return await axios.post(url, data, { validateStatus: () => true });
  }

  async put(url: string, data: any) {
    return await axios.put(url, data, { validateStatus: () => true });
  }

  setAuthToken(token?: string) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("Authorization", token.toString());
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("Authorization");
    }
  }

  isAuthTokenSetted() {
    return axios.defaults.headers.common["Authorization"] != null;
  }
}
