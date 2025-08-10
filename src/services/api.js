import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: "https://localhost:7099/Api/V1",
});

api.interceptors.request.use(
  (config) => {
    const language = Cookies.get('i18next') || 'en';
    config.headers['Accept-Language'] = language;

    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
