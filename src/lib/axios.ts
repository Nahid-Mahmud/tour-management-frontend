/* eslint-disable @typescript-eslint/no-explicit-any */
import { envConfig } from "@/config";
import axios, { type AxiosRequestConfig } from "axios";

/**
 * Create a configured axios instance with base settings
 * - baseURL: Gets the API URL from environment config
 * - withCredentials: Allows cookies to be sent with requests (for authentication)
 */
export const axiosInstance = axios.create({
  baseURL: envConfig.baseUrl,
  withCredentials: true,
});

/**
 * Request interceptor - runs before every API request is sent
 * Currently just passes the config through unchanged
 */
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 * Variables for handling automatic token refresh
 * - isRefreshing: Prevents multiple simultaneous refresh attempts
 * - pendingQueue: Stores requests that wait while token is being refreshed
 */
let isRefreshing = false;

let pendingQueue: {
  resolve: (value: any) => void;
  reject: (value: any) => void;
}[] = [];

/**
 * Process all queued requests after token refresh completes
 * @param error - If there's an error, reject all queued requests, otherwise resolve them
 */
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

/**
 * Response interceptor - handles all API responses and errors
 * Main purpose: Automatically refresh expired tokens and retry failed requests
 */
axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    // Success response (status 2xx) - just return the response as-is
    return response;
  },
  async function onRejected(error) {
    // Error response (status outside 2xx) - handle token expiration

    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Check if the error is due to an expired token (401 status with specific message)
    if (
      error.response.status === 401 &&
      error.response.data.message === "Token has expired" &&
      !originalRequest._retry
    ) {
      console.log("Token has expired");

      originalRequest._retry = true; // Mark this request as a retry attempt

      // If a token refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest)) // Retry the original request after refresh
          .catch((error) => Promise.reject(error));
      }

      // Start the token refresh process
      isRefreshing = true;

      try {
        // Call the refresh endpoint to get a new token
        await axiosInstance.post("/auth/refresh-token");

        // Refresh successful - process all queued requests
        processQQueue(null);

        // Retry the original request that failed
        return axiosInstance(originalRequest);
      } catch (error) {
        // Refresh failed - reject all queued requests and the current one
        console.log(error);
        processQQueue(error);
        return Promise.reject(error);
      } finally {
        // Reset the refreshing flag regardless of success/failure
        isRefreshing = false;
      }
    }

    // For all other errors, just reject the promise
    return Promise.reject(error);
  }
);
