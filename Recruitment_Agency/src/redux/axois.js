import axios from 'axios';

const baseURL = 'https://sbm-recruit.herokuapp.com/';
export const recruit = axios.create({baseURL});
