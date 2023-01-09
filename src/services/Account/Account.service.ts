import { AxiosResponse } from "axios";
import { getServerURL } from "../../helper/Utils";
import { Account } from "../../model/Account";
import { Station } from "../../model/Station";
import HTTPService from "../Http/Http.service";
import HttpService from "../Http/Http.service";

const connectMailAccount = async (account: Account, captchaToken: String) => {
  const result = await HttpService.put(getServerURL() + ":8083/User/MailUser", {
    email: account.email,
    password: account.password,
    captchaToken: captchaToken,
  });

  return interpretConection(result);
};
const connectFacebookAccount = async (accessToken: String) => {
  const result = await HttpService.put(
    getServerURL() + ":8083/User/FacebookUser",
    {
      accessToken: accessToken,
    }
  );

  return interpretConection(result);
};

const createMailAccount = async (account: Account, captchaToken: String) => {
  const result = await HttpService.post(
    getServerURL() + ":8083/User/MailUser",
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
    getServerURL() + ":8083/User/FacebookUser",
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

    const payload = JSON.parse(window.atob(jwt.split(".")[1]));

    const user = {
      id: payload.id,
      favoriteStations: interpretJSONStationReceive(payload.favoriteStations),
    } as Account;
    return user;
  } else return result.status;
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
      getServerURL() + ":8083/User/MailUser/exist?mail=" + id
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
  HTTPService.put(getServerURL() + ":8083/User/addFavoriteStation", {
    id_station: station.id,
  });
};

const removeFavoriteStation = (station: Station) => {
  HTTPService.put(getServerURL() + ":8083/User/removeFavoriteStation", {
    id_station: station.id,
  });
};

const getFavoriteStations = () => {
  return [] as Station[];
};

const AccountService = {
  connectMailAccount,
  connectFacebookAccount,
  createMailAccount,
  createFacebookAccount,
  isAccountExist,
  isAuthTokenSetted,
  disconnect,
  addFavoriteStation,
  removeFavoriteStation,
  getFavoriteStations,
};

export default AccountService;
