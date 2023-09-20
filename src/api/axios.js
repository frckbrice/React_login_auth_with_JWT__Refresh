import axios from 'axios';

const BASE_URL = "http://localhost:3500";

export const server = axios.create({
  baseURL: BASE_URL,
});

// this axios instance will just intercepts all requests
export const serverInterceptor = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
});

 