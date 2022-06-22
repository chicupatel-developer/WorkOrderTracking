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

  getOperation = async (opId) => {
    return await http.get(`/getOperation/${opId}`, {
      headers: authHeader(),
    });
  };

  editOperation = async (data) => {
    return await http.post(`/editOperation`, data, {
      headers: authHeader(),
    });
  };

  // xfer parts
  getPartList = async () => {
    return await http.get(`/getPartList`, {
      headers: authHeader(),
    });
  };
  getOperationDetails = async (opId) => {
    return await http.get(`/getOperationDetails/${opId}`, {
      headers: authHeader(),
    });
  };
  xferPartsForOperation = async (data) => {
    return await http.post(`/xferPartsForOperation`, data, {
      headers: authHeader(),
    });
  };

  getOperationLogData = async (opId) => {
    return await http.get(`/getOperationLogData/${opId}`, {
      headers: authHeader(),
    });
  };

  getPartHistory = async (opId) => {
    return await http.get(`/getPartHistory/${opId}`, {
      headers: authHeader(),
    });
  };
}
export default new OperationService();
