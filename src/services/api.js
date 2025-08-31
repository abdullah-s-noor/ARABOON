import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.PROD
    ? 'https://araboon.runasp.net/Api/V1'
    : '/api/V1',
});

api.interceptors.request.use(
  (config) => {
    const language = Cookies.get('i18next') || 'en';
    config.headers['Accept-Language'] = language;
    const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6ImRhcnh4MDNlaCIsIkVtYWlsIjoiZGFyeHgwM2VoQGdtYWlsLmNvbSIsIkZpcnN0TmFtZSI6Ik1haG1vdWQiLCJMYXN0TmFtZSI6IkRhcmF3c2hlaCIsIklEIjoiMSIsIlJvbGUiOiJBZG1pbiIsImV4cCI6MTc1NjcwNzEwOCwiaXNzIjoiYXJhYm9vbi1hdXRoLXNlcnZlciIsImF1ZCI6ImFyYWJvb24tY2xpZW50cyJ9.YXsT7EsuicuJKW1C8XHph3bLhZlPMZuS-RZSfaNUt_A";
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Cache-Control'] = 'no-cache';
    config.headers['Pragma'] = 'no-cache';

    return config;
  },
  (error) => Promise.reject(error)
);
