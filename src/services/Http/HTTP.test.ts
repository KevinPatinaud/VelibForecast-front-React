import axios, { Axios, AxiosResponse } from "axios";
import HttpService from "./Http.service";

jest.mock("axios");

describe("HTTPservice", () => {
  describe("When get function is called", () => {
    it("should call axios", async () => {
      axios.get = jest.fn().mockReturnValue({
        data: { AxiosResponse: "AxiosResponse" },
      } as AxiosResponse<any, any>);

      const response = await HttpService.get("www.URL_TEST.com");

      expect(axios.get).toHaveBeenCalledWith("www.URL_TEST.com");
      expect(response).toEqual({ data: { AxiosResponse: "AxiosResponse" } });
    });
  });

  describe("When post function is called", () => {
    it("should call post axios", async () => {
      axios.post = jest.fn().mockReturnValue({
        data: { AxiosResponse: "AxiosResponse" },
      } as AxiosResponse<any, any>);

      const response = await HttpService.post("www.URL_TEST.com", {
        postParam: "postParam",
      });

      expect(axios.post).toHaveBeenCalled();
      expect(response).toEqual({ data: { AxiosResponse: "AxiosResponse" } });
    });
  });

  describe("When put function is called", () => {
    it("should call put axios", async () => {
      axios.put = jest.fn().mockReturnValue({
        data: { AxiosResponse: "AxiosResponse" },
      } as AxiosResponse<any, any>);

      const response = await HttpService.put("www.URL_TEST.com");

      expect(axios.put).toHaveBeenCalledWith("www.URL_TEST.com", undefined, {
        validateStatus: expect.any(Function),
      });
      expect(response).toEqual({ data: { AxiosResponse: "AxiosResponse" } });
    });
  });

  describe("When put function is called with basic auth", () => {
    it("should call put axios with basic auth", async () => {
      axios.put = jest.fn().mockReturnValue({
        data: { AxiosResponse: "AxiosResponse" },
      } as AxiosResponse<any, any>);

      const response = await HttpService.put(
        "www.URL_TEST.com",
        { bodyData: "bodyData" },
        {
          auth: { username: "username", password: "password" },
        }
      );

      expect(axios.put).toHaveBeenCalledWith(
        "www.URL_TEST.com",
        { bodyData: "bodyData" },
        {
          validateStatus: expect.any(Function),
          auth: {
            password: "password",
            username: "username",
          },
        }
      );
      expect(response).toEqual({ data: { AxiosResponse: "AxiosResponse" } });
    });
  });
});
