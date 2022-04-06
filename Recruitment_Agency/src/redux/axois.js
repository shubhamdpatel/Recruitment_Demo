import axios from 'axios';

const baseURL = 'http://localhost:3000/';
// const baseURL = '127.0.0.1:3000/';
export const recruit = axios.create({baseURL});
