import axios from "axios";

const get = async (url: string) => {
  return await axios.get(url);
};

const post = async (url: string, data: any) => {
  return await axios.post(url, data, { validateStatus: () => true });
};

const put = async (url: string, data?: any, config?: any) => {
  if (
    config !== null &&
    config !== undefined &&
    config.auth !== null &&
    config.auth !== undefined
  )
    return await axios.put(url, data, {
      validateStatus: () => true,
      auth: {
        username: config.auth.username,
        password: config.auth.password,
      },
    });

  return await axios.put(url, data, {
    validateStatus: () => true,
  });
};

const setHeader = (key: string, value: string) => {
  axios.defaults.headers.common[key] = value;
};

const removeHeader = (key: string) => {
  delete axios.defaults.headers.common[key];
};

const setAuthToken = (token?: string) => {
  if (token) {
    setHeader("Authorization", `Bearer ${token}`);
    localStorage.setItem("Authorization", token.toString());
  } else {
    removeHeader("Authorization");
    localStorage.removeItem("Authorization");
  }
};

const isAuthTokenSetted = () => {
  if (axios.defaults.headers.common["Authorization"]) return true;

  if (localStorage.getItem("Authorization")) {
    setAuthToken(localStorage.getItem("Authorization") as string);
  }

  return axios.defaults.headers.common["Authorization"] != null;
};

const HTTPService = {
  get,
  post,
  put,
  setAuthToken,
  setHeader,
  removeHeader,
  isAuthTokenSetted,
};

export default HTTPService;
