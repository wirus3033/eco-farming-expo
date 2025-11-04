import axios, {AxiosInstance, AxiosError} from 'axios';
import { BASE_URL } from './endPoint';
import { getData } from '../helpers/AsyncStorage';
import { BDD_Local } from '../constants/BaseLocal';

// import {BASE_URL} from '../../endPoint';

const baseURL = BASE_URL;
const TIMEOUT_DURATION = 100000000000000; // 10 milliseconds to force a quick timeout

const axiosAPI: AxiosInstance = axios.create({
  baseURL,
  timeout: TIMEOUT_DURATION,
});

// Add request interceptor
axiosAPI.interceptors.request.use(
  async config => {
    const token = await getData(BDD_Local.token);
    console.log('Middleware axios token: ', token);
    if (token) {
       config.headers['Authorization'] = `Bearer ${token}`;
    }
    const fullUrl = config.baseURL ? `${config.baseURL}${config.url}` : config.url;
    console.log('Full request URL: ', fullUrl);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Define the TimeoutResponse interface
export interface TimeoutResponse {
  status_code: number;
  messages: string;
  data: any[]; // Adjusted to `any[]` to accommodate various error data
}

// Add response interceptor
axiosAPI.interceptors.response.use(
  response => {
    if (response.data.status_code!== 200) {
      console.log('Response intercepted by axios:', response.data); // Check if this logs
    }
   
    return response;
  },
  error => {
    console.log('Error intercepted:', error); // Check if this logs
    const axiosError = error as AxiosError;
    if (axiosError.code === 'ECONNABORTED') {
      // Handle timeout error and wrap the error in the `TimeoutResponse` interface
      console.log('Timeout error intercepted');
      const timeoutResponse: TimeoutResponse = {
        status_code: 408,
        messages: 'La communication a mis trop de temps à répondre, veuillez réessayer !',
        data: [{error: axiosError.message}], // Placing the error message in the `data` field
      };
      return Promise.resolve({data: timeoutResponse});
    }
    return Promise.reject(axiosError);
  },
);

export default axiosAPI;
