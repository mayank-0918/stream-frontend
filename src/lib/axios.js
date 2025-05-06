// import axios from "axios";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

// export const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, // send cookies with the request
// });


import axios from "axios";

// Use environment variable for the base URL
const BASE_URL = import.meta.env.VITE_STREAM_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
