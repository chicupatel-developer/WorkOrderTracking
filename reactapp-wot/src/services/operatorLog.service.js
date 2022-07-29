import http from "../axios/operatorLog-http-common";
import authHeader from "./auth.header";

class OperatorLogService {
  getWorkOrderList = async () => {
    return await http.get(`/getWorkOrderList`, {
      headers: authHeader(),
    });
  };

  getOperationList = async (selectedWoId) => {
    return await http.get(`/getOperationList/${selectedWoId}`, {
      headers: authHeader(),
    });
  };

  getOperationQtyData = async (selectedOpId) => {
    return await http.get(`/getOperationQtyData/${selectedOpId}`, {
      headers: authHeader(),
    });
  };

  createOperatorLog = async (data) => {
    return await http.post(`/createOperatorLog`, data, {
      headers: authHeader(),
    });
  };

  getMyLogData = async (data) => {
    return await http.post(`/getMyLogData`, data, {
      headers: authHeader(),
    });
  };
}
export default new OperatorLogService();
