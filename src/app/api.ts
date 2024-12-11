import axios, {
  AxiosInstance,
} from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// any addition token I can add here with interceptors


export default api;
