import { AxiosResponse } from "axios";
import { getServerURL } from "../../helper/Utils";
import { Account } from "../../model/Account";
import { Station } from "../../model/Station";
import HTTPService from "../Http/Http.service";
import HttpService from "../Http/Http.service";
import AccountService from "./Account.service";

jest.spyOn(HttpService, "post").mockImplementation(() => {
  return Promise.resolve({
    data: { JWT: "JWT TOKEN" },
    status: 200,
  } as AxiosResponse<any, any>);
});

jest.spyOn(HttpService, "put").mockImplementation(() => {
  return Promise.resolve({
    data: { JWT: "JWT TOKEN" },
    status: 200,
  } as AxiosResponse<any, any>);
});

jest.spyOn(HttpService, "get").mockImplementation(() => {
  return Promise.resolve({
    data: { JWT: "JWT TOKEN" },
    status: 200,
  } as AxiosResponse<any, any>);
});

jest.spyOn(HttpService, "isAuthTokenSetted").mockImplementation(() => {
  return false;
});

jest.spyOn(HttpService, "setAuthToken").mockImplementation();

describe("Account service", () => {
  describe("when createMailAccount service is called", () => {
    it("should call http service", () => {
      AccountService.createMailAccount({} as Account, "captcha token");

      expect(HttpService.post).toHaveBeenCalledWith(
        getServerURL() + ":8083/api/user/mailuser",
        {
          email: undefined,
          password: undefined,
          captchaToken: "captcha token",
        }
      );
    });
  });

  describe("when connectMailAccount service is called", () => {
    it("should call http service", () => {
      AccountService.connectMailAccount({
        email: "mail",
        password: "password",
      } as Account);

      expect(HttpService.put).toHaveBeenCalledWith(
        getServerURL() + ":8083/api/user/mailuser",
        {
          email: "mail",
        },
        { auth: { password: "password", username: "mail" } }
      );
    });
  });

  describe("when createFacebookAccount service is called", () => {
    it("should call http service", () => {
      AccountService.createFacebookAccount("Token access");

      expect(HttpService.post).toHaveBeenCalledWith(
        getServerURL() + ":8083/api/user/facebookuser",
        {
          accessToken: "Token access",
        }
      );
    });
  });

  describe("when connectFacebookAccount service is called", () => {
    it("should call http service", () => {
      AccountService.connectFacebookAccount("Token access");

      expect(HttpService.put).toHaveBeenCalledWith(
        getServerURL() + ":8083/api/user/facebookuser"
      );
    });
  });

  describe("when isAccountExist service is called", () => {
    it("should call http service", () => {
      AccountService.isAccountExist("My_test_id");

      expect(HttpService.get).toHaveBeenCalledWith(
        getServerURL() + ":8083/api/user/ismailalreadyrecorded?mail=My_test_id"
      );
    });
  });

  describe("when disconnect service is called", () => {
    it("should call http service", () => {
      AccountService.disconnect();

      expect(HttpService.setAuthToken).toHaveBeenCalledWith();
    });
  });

  describe("when the result of a connection is good", () =>
    it("should save the token", () => {
      const res = AccountService.interpretConection({
        status: 200,
        data: { JWT: "JWT Token" },
      } as AxiosResponse<any, any>);

      expect(HTTPService.setAuthToken).toHaveBeenCalledWith("JWT Token");
    }));

  describe("when the result of a connection is wrong", () =>
    it("shouldn't save the token", () => {
      const res = AccountService.interpretConection({
        status: 401,
        data: { JWT: "JWT Token" },
      } as AxiosResponse<any, any>);

      expect(HTTPService.setAuthToken).not.toHaveBeenCalled();
    }));

  describe("when the jwt is wrongly formatted", () => {
    it("should return an empty user", () => {
      const res = AccountService.getUserFromJWT(
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJmYXZvcml0ZVN0YXRpb25zXCI6W3tcInN0YXRpb25Db2RlXCI6OTAwMixcInRpbWVTdGFtcEluZm9ybWF0aW9uR290XCI6MCxcImxhdGl0dWRlXCI6NDguODc5MjIzLFwibmFtZVwiOlwiQWJiZXZpbGxlIC0gRmF1Ym91cmcgUG9pc3Nvbm5pZXJcIixcInJlbnRhbE1ldGhvZHNcIjpcIkNSRURJVENBUkRcIixcImxvbmdpdHVkZVwiOjIuMzQ5MTQ3LFwiY2FwYWNpdHlcIjoxNH1dLFwiaWR1c2VyXCI6XCJlNmI5OTllOC1hMjEwLTRjZjktYTdjNC0wOGIwZmM2YTc3YzBcIn0iLCJpYXQiOjE2NzM3OTY1NzcsImV4cCI6MTY3Mzc5Njg3N30.-HJoLqWY5OAsgbdOX-6wTyHJJsPbxUDdou0nWR-d1XZ1AKio_lCxF0ncRzr-EH81Bc_jh245JKGmR3tlI3jY9g"
      );

      expect(res).toEqual({
        favoriteStations: [
          {
            capacity: 14,
            id: 9002,
            lat: 48.879223,
            lng: 2.349147,
            name: "Abbeville - Faubourg Poissonnier",
          },
        ],
        id: "e6b999e8-a210-4cf9-a7c4-08b0fc6a77c0",
      });
    });
  });

  describe("when the jwt is well formatted", () => {
    it("should return an user", () => {
      const res = AccountService.getUserFromJWT("");

      expect(res).toEqual({});
    });
  });

  describe("when add a new favorite station", () => {
    it("will informe the backend", () => {
      jest.spyOn(HTTPService, "put").mockResolvedValue(
        Promise.resolve({
          data: {},
          status: 200,
        } as AxiosResponse<any, any>)
      );

      AccountService.addFavoriteStation({ id: 123 } as Station);

      expect(HTTPService.put).toHaveBeenCalledWith(
        "http://localhost:8083/api/user/addfavoritestation",
        { id_station: 123 }
      );
    });
  });

  describe("when remove a favorite station", () => {
    it("will informe the backend", () => {
      jest.spyOn(HTTPService, "put").mockResolvedValue(
        Promise.resolve({
          data: {},
          status: 200,
        } as AxiosResponse<any, any>)
      );

      AccountService.removeFavoriteStation({ id: 123 } as Station);

      expect(HTTPService.put).toHaveBeenCalledWith(
        "http://localhost:8083/api/user/removefavoritestation",
        { id_station: 123 }
      );
    });
  });
});
