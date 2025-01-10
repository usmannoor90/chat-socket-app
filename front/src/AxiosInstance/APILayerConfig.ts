import axios from "axios";

const API = import.meta.env.VITE_API_URL;




const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

import { AxiosError } from "axios";

let lastError: AxiosError | null = null;

axiosInstance.interceptors.request.use(
  (config) => {
    // console.log(config);
    return config;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    // Handle response error
    console.log(error);
    lastError = error;
    return Promise.reject(error);
  }
);

// Function to get the last error
export const getLastError = () => {
  const error = lastError;
  // Reset the lastError variable
  lastError = null;
  return error;
};

export default axiosInstance;
