import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api'

export const publicRequest = axios.create({
    baseURL: BASE_URL
})
export const privateRequest = axios.create({
    baseURL: BASE_URL
})

export const formRequest = axios.create({
	baseURL: BASE_URL,
});

privateRequest.interceptors.request.use((config) => {
  try {
    const persistedState = localStorage.getItem('persist:root');
    if (persistedState) {
      const root = JSON.parse(persistedState);
      const auth = JSON.parse(root.auth); 
      const token = auth?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.log(error)
  }
  return config;
}, error => Promise.reject(error));


formRequest.interceptors.request.use((config) => {
  try {
    const persistedState = localStorage.getItem('persist:root');
    if (persistedState) {
      const root = JSON.parse(persistedState);
      const auth = JSON.parse(root.auth); 
      const token = auth?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.log(error)
  }
  return config;
}, error => Promise.reject(error));
