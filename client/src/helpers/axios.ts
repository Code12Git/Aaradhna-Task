import axios from 'axios'

const BASE_URL = 'https://aaradhna-task.onrender.com/api'

export const publicRequest = axios.create({
    baseURL: BASE_URL
})
export const privateRequest = axios.create({
    baseURL: BASE_URL
})


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
    console.error(error)
  }
  return config;
}, error => Promise.reject(error));


