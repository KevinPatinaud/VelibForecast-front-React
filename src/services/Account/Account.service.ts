import { AxiosResponse } from "axios";
import { getServerURL } from "../../helper/Utils";
import { Account } from "../../model/Account";
import { Station } from "../../model/Station";
import HTTPService from "../Http/Http.service";
import HttpService from "../Http/Http.service";

const connectMailAccount = async (account: Account, captchaToken: String) => {
  const result = await HttpService.put(
    getServerURL() + ":8083/api/user/mailuser",
    {
      email: account.email,
      captchaToken: captchaToken,
    },
    {
      auth: {
        username: account.email,
        password: account.password,
      },
    }
  );

  return interpretConection(result);
};
const connectFacebookAccount = async (accessToken: String) => {
  HTTPService.setHeader("facebook_access_token", accessToken.toString());
  const result = await HttpService.put(
    getServerURL() + ":8083/api/user/facebookuser"
  );
  HTTPService.removeHeader("facebook_access_token");

  return interpretConection(result);
};

const createMailAccount = async (account: Account, captchaToken: String) => {
  const result = await HttpService.post(
    getServerURL() + ":8083/api/user/mailuser",
    {
      email: account.email,
      password: account.password,
      captchaToken: captchaToken,
    }
  );

  return interpretConection(result);
};

const createFacebookAccount = async (accessToken: String) => {
  const result = await HttpService.post(
    getServerURL() + ":8083/api/user/facebookuser",
    {
      accessToken: accessToken,
    }
  );

  return interpretConection(result);
};

const interpretConection = (result: AxiosResponse<any, any>) => {
  if (result === undefined || result.status === undefined) return null;

  if (result.status === 200) {
    const jwt = result?.data.JWT as String;
    HttpService.setAuthToken(jwt.toString());
    return getUserFromJWT(jwt.toString());
  } else return result.status;
};

const getUserFromJWT = (jwt: string) => {
  if (jwt.split(".").length !== 3) return {} as Account;

  const payload = JSON.parse(window.atob(jwt.split(".")[1]));

  const sub = JSON.parse(payload.sub);

  const user = {
    id: sub.iduser,
    favoriteStations: interpretJSONStationReceive(sub.favoriteStations),
  } as Account;
  return user;
};

const interpretJSONStationReceive = (favoriteStations: any) => {
  const stations = [] as Station[];

  favoriteStations.forEach(function (favStation: any) {
    stations.push({
      id: favStation.stationCode,
      name: favStation.name,
      capacity: favStation.capacity,
      lat: favStation.latitude,
      lng: favStation.longitude,
    } as Station);
  });

  return stations;
};

const isAccountExist = async (id: String) => {
  return (
    await HttpService.get(
      getServerURL() + ":8083/api/user/ismailalreadyrecorded?mail=" + id
    )
  )?.data;
};

const isAuthTokenSetted = () => {
  return HttpService.isAuthTokenSetted();
};

const disconnect = () => {
  HttpService.setAuthToken();
};

const addFavoriteStation = (station: Station) => {
  HTTPService.put(getServerURL() + ":8083/api/user/addfavoritestation", {
    id_station: station.id,
  });
};

const removeFavoriteStation = (station: Station) => {
  HTTPService.put(getServerURL() + ":8083/api/user/removefavoritestation", {
    id_station: station.id,
  });
};

const AccountService = {
  connectMailAccount,
  connectFacebookAccount,
  createMailAccount,
  createFacebookAccount,
  isAccountExist,
  isAuthTokenSetted,
  getUserFromJWT,
  disconnect,
  addFavoriteStation,
  removeFavoriteStation,
};

export default AccountService;
