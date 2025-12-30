import axios from 'axios';

// Use API base URL from environment (configured in .env) and fall back to default dev URL.
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://dev-api.popnplace.nl/api/v1',
  timeout: 15000,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can extend this to handle global error notifications/logging
    return Promise.reject(error);
  }
);

export default axiosClient;


