import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://dev-api.popnplace.nl/api/v1',
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


