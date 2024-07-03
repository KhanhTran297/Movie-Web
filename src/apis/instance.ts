import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../.env.local" }); // Specify the path if it's not the default '.env'
// const baseURL = process.env.BaseURL;
const baseURL = "https://api.themoviedb.org/3";

// const accessToken = process.env.AccessToken;
const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Nzc4YTg2ZDY2NmI1Nzc1MGYyMzY1ZDM3MGE1ODAyMSIsIm5iZiI6MTcxOTk3OTk0MS42NTU0MTIsInN1YiI6IjY0YjY2NWVhYWM0MTYxMDBjNTMzMjA5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GVpagxE6mzkU7qo0SUalfhIxh7q5ICU2KfTvglRUArE";
export const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  params: {},
});
instance.interceptors.response.use(
  function (response) {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
