import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';

interface TokenResponse {
  access: string;
  refresh: string;
}

const TOKEN_REFRESH_URL = 'https://erp.imminenttechnology.com/api/token/refresh/';

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (error: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://erp.imminenttechnology.com/api',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    const isAuthEndpoint = originalRequest.url?.includes('/token/') || originalRequest.url?.includes('/refresh-token');
    
    if (isAuthEndpoint) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post<TokenResponse>(TOKEN_REFRESH_URL, { refresh: refreshToken });
        const { access } = response.data;

        localStorage.setItem('accessToken', access);
        api.defaults.headers.common.Authorization = `Bearer ${access}`;
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access}`;
        }

        processQueue(null, access);
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // Handle error, maybe redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';  // Redirect to login page
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Helper methods for API calls
const get = <T>(url: string, config?: AxiosRequestConfig) => api.get<T>(url, config);
const post = <T>(url: string, data?: any, config?: AxiosRequestConfig) => api.post<T>(url, data, config);
const patch = <T>(url: string, data?: any, config?: AxiosRequestConfig) => api.patch<T>(url, data, config);
const del = <T>(url: string, config?: AxiosRequestConfig) => api.delete<T>(url, config);

export default {
  api,
  get,
  post,
  patch,
  del,
};
