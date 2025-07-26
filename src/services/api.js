import axios from 'axios';
export const api = axios.create({
    baseURL: "https://bimicake-hanmza.onrender.com",
});
// Add a request interceptor to dynamically attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("userToken");
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);