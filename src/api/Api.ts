import { ApiConfig } from "./Api.types";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
/**
 * Configuring the axios instance.
 */
const DEFAULT_API_CONFIG: ApiConfig = {
  url: process.env.EXPO_PUBLIC_API_URL || "",
  apiVersion: process.env.EXPO_PUBLIC_API_VERSION || "",
  timeout: 10000,
};

/**
 * Initialise axio api instance
 */
export const api = axios.create({
  baseURL: `${DEFAULT_API_CONFIG.url}/${DEFAULT_API_CONFIG.apiVersion}/`,
  timeout: DEFAULT_API_CONFIG.timeout,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response?.data;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
