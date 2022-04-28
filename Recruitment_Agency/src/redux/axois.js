import axios from 'axios';
import {Platform} from 'react-native';

const baseURL =
  Platform.OS === 'ios'
    ? 'http://localhost:3000/'
    : 'http://192.168.201.78:3000/';
// const baseURL = '127.0.0.1:3000/';
export const recruit = axios.create({baseURL});
