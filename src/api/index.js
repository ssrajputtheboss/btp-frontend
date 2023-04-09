import axios from 'axios';

export const ENDPOINT = 'http://172.16.202.38:5000';

axios.defaults.baseURL = ENDPOINT;

export async function logIn(email, password) {
  const res = await axios.post('/login', { email, password });
  return res.data;
}

export async function signUp(email, password, name) {
  const res = await axios.post('/signup', { name, email, password });
  return res.data;
}

export async function getSummaries() {
  const res = await axios.get('/getsummaries');
  return res.data.summaries || [];
}

export async function getUploads() {
  const res = await axios.get('/getuploads');
  return res.data.uploads || [];
}

export async function uploadFile(data) {
  const res = await axios.post('/upload', data);
  return res.data;
}
