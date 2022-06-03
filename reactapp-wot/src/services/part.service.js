import http from "../axios/part-http-common";
import authHeader from "./auth.header";

class PartService {
  allParts = async () => {
    return await http.get(`/allParts`, {
      headers: authHeader(),
    });
  };
}
export default new PartService();
