import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

// ⏳ 5 minutes (in milliseconds)
const INACTIVITY_TIME = 5 * 60 * 1000;

let inactivityTimer;

// Reset timer function
const resetInactivityTimer = () => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }

  inactivityTimer = setTimeout(() => {
    logoutUser();
  }, INACTIVITY_TIME);
};

const logoutUser = () => {
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
    }

    // Reset timer whenever API is called
    resetInactivityTimer();

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Also reset timer on successful response
    resetInactivityTimer();
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      logoutUser();
    }
    return Promise.reject(error);
  }
);

// Start timer initially
resetInactivityTimer();

export default axiosClient;