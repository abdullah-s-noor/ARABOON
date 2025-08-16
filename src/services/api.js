import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: "http://araboon.runasp.net/Api/V1",
});

api.interceptors.request.use(
  (config) => {
    const language = Cookies.get('i18next') || 'en';
    config.headers['Accept-Language'] = language;
    const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6ImFib29kIiwiRW1haWwiOiJhYm9vZG5vb3JtbTIwMDRAZ21haWwuY29tIiwiRmlyc3ROYW1lIjoiQWJkdWxsYWgiLCJMYXN0TmFtZSI6Ik5vb3IiLCJJRCI6IjEwMDMiLCJSb2xlIjoiVXNlciIsImV4cCI6MTc1NTQxMTY0NCwiaXNzIjoiYXJhYm9vbi1hdXRoLXNlcnZlciIsImF1ZCI6ImFyYWJvb24tY2xpZW50cyJ9._vk7irFdAFZWJBHomSKACZXvpvm4gwiqxp69PUAwvlc";
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
