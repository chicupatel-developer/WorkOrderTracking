import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44359/api/CustomerOrder",
  headers: {
    "Content-type": "application/json",
  },
});
