import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44359/api/OperatorLog",
  headers: {
    "Content-type": "application/json",
  },
});
