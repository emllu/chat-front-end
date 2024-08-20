import axios from 'axios';

const axiosInstance = axios.create({
   
  baseURL: 'https://chat-backend-1-ma11.onrender.com', 
  },
);

export default axiosInstance;
