import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.PROD
    ? 'https://araboon.runasp.net/Api/V1'
    : '/api/V1',
});

// refreshApi: مخصص للـ refresh request (بدون interceptors)
const refreshApi = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.PROD
    ? 'https://araboon.runasp.net/Api/V1'
    : '/api/V1',
  withCredentials: true,
});

let accessToken = null;
let isRefreshing = false;
let failedQueue = [];

export const setApiAccessToken = (token) => {
  accessToken = token;
};

export const clearApiAccessToken = () => {
  accessToken = null;
};

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  config => {
    const language = Cookies.get('i18next') || 'en';
    config.headers['Accept-Language'] = language;
    console.log(accessToken)
    const temp=`Bearer ${accessToken?accessToken:''}`
    console.log(temp)
    config.headers.Authorization = accessToken?`Bearer ${accessToken}`:'';

    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    console.log(error)
    if (
      error.response &&
      error.response.status === 401 &&
      (error.response.data.message==="The token has expired"||error.response.data.message==="انتهت صلاحية الرمز")&&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(refreshedToken => {
          originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const { data } = await refreshApi.post("/Authentication/GenerateRefreshToken");
        const newAccessToken = data.data.access;

        setApiAccessToken(newAccessToken);
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearApiAccessToken();
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export { api };
