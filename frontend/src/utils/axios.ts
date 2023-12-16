import axios from 'axios';

const url : string = "http://localhost:3000/api";
const axiosInstance = axios.create({
  baseURL: url,
});

export default axiosInstance;