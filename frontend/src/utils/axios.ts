import axios from 'axios';

const url : string = import.meta.env.BASE_URL;

const axiosInstance = axios.create({
  baseURL:url,
});

export default axiosInstance;