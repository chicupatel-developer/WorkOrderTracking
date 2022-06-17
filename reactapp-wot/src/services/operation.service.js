import http from "../axios/operation-http-common";
import authHeader from "./auth.header";

class OperationService {
  getAllWorkOrderOperations = async (woId) => {
    console.log(woId);
    return await http.get(`/getAllWorkOrderOperations/${woId}`, {
      headers: authHeader(),
    });
  };

  getWorkOrderList = async () => {
    return await http.get(`/getWorkOrderList`, {
      headers: authHeader(),
    });
  };

  createOperation = async (data) => {
    return await http.post(`/createOperation`, data, {
      headers: authHeader(),
    });
  };
}
export default new OperationService();
