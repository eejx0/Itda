import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_FIREBASE_BASE_URL,
    timeout: 10000, 
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;