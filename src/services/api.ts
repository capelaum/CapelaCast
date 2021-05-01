import axios from "axios";

let port = process.env.PORT || 3333;

export const api = axios.create({
  baseURL: "http://localhost:" + port,
});
