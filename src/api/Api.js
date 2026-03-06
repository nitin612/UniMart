import axios from 'axios';

const API = axios.create({
  baseURL: 'https://my-uni-mart.vercel.app/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default API;