import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44359/api/Authenticate",
  headers: {
    "Content-type": "application/json",
  },
});
