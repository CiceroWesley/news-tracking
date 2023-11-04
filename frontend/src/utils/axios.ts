import axios from 'axios';

const url : string = import.meta.env.VITE_API_URL;
console.log(url)
const axiosInstance = axios.create({
  baseURL: url,
});

export default axiosInstance;