import axios from 'axios';

const baseURL = 'http://192.168.201.78:3000';
// const baseURL = 'https://sbm-recruit.herokuapp.com/';
export const recruit = axios.create({baseURL});
