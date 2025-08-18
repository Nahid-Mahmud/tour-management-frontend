/* eslint-disable @typescript-eslint/no-explicit-any */
import { envConfig } from "@/config";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: envConfig.baseUrl,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor

let isRefreshing = false;

let pendingQueue: {
  resolve: (value: any) => void;
  reject: (value: any) => void;
}[] = [];

const processQQueue = (error: any) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });

  pendingQueue = [];
};

axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    // console.log(error.response.data.message);
    // console.log(error.response.status);

    const originalRequest = error.config as AxiosRequestConfig;

    if (error.response.status === 401 && error.response.data.message === "Token has expired") {
      console.log("Token has expired");

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error));
      }

      isRefreshing = true;

      try {
        await axiosInstance.post("/auth/refresh-token");

        processQQueue(null);

        return axiosInstance(originalRequest);

        // If the refresh token is valid, update the access token
      } catch (error) {
        console.log(error);
        processQQueue(error);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    // for all requests
    return Promise.reject(error);
  }
);
