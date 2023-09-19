import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:3500'
})

export default server;