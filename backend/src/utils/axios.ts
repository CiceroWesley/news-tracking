import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:'https://news.google.com/search',
});

export default axiosInstance;