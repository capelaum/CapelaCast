import axios from "axios";

let port = process.env.PORT || 3000;

export const api = axios.create({
  baseURL: "http://localhost:" + port,
});
