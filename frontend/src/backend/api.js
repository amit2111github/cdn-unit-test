import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
console.log(baseURL);
const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
