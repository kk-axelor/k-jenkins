import axios from "axios";

const rest = axios.create({
  baseURL: "https://dummyjson.com",
});

export default rest;
