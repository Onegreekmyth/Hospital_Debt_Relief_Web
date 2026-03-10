import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

// ⏳ 5 minutes (in milliseconds)
const INACTIVITY_TIME = 5 * 60 * 1000;

let inactivityTimer;

const isLoggedIn = () => !!localStorage.getItem('token');

// Reset timer function
const resetInactivityTimer = () => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }

  if (!isLoggedIn()) return;

  inactivityTimer = setTimeout(() => {
    logoutUser();
  }, INACTIVITY_TIME);
};

const logoutUser = () => {
  if (!isLoggedIn()) return;

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  window.location.href = '/login';
};

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      resetInactivityTimer();
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    if (isLoggedIn()) {
      resetInactivityTimer();
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && isLoggedIn()) {
      logoutUser();
    }
    return Promise.reject(error);
  }
);

// Only start timer if user is already logged in
if (isLoggedIn()) {
  resetInactivityTimer();
}

export default axiosClient;