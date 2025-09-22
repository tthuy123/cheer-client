import axios from "axios";
import store from "../redux/store";

const Client = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "content-type": "application/json",
  },
});

Client.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const token = state.auth.token; 
    if (token) {
      config.headers.token = `Bearer ${token}`;
      console.log("Authorization Header:", config.headers.Authorization);
    } else {
      console.warn("No token provided");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Client.interceptors.response.use(
  (response) => {
    if (response && (response.data || response.data === 0)) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default Client;