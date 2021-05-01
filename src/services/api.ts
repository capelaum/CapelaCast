import axios from "axios";

let port = process.env.PORT || 3333;

// change baseURL to localhost:3333 to run server locally
export const api = axios.create({
  baseURL: "https://capelacast-server.herokuapp.com",
});
