import http from "../axios/workOrder-http-common";
import authHeader from "./auth.header";

class WorkOrderService {
  allWorkOrders = async () => {
    return await http.get(`/allWorkOrders`, {
      headers: authHeader(),
    });
  };

  getCustomerOrderDetails = async (coId) => {
    return await http.get(`/getCustomerOrderDetails/${coId}`, {
      headers: authHeader(),
    });
  };
  getCustomerOrders = async () => {
    return await http.get(`/getCustomerOrders`, {
      headers: authHeader(),
    });
  };

  createWorkOrder = async (data) => {
    return await http.post(`/createWorkOrder`, data, {
      headers: authHeader(),
    });
  };

  getWorkOrder = async (woId) => {
    return await http.get(`/getWorkOrder/${woId}`, {
      headers: authHeader(),
    });
  };

  editWorkOrder = async (data) => {
    return await http.post(`/editWorkOrder`, data, {
      headers: authHeader(),
    });
  };

  removeWorkOrder = async (data) => {
    return await http.post(`/removeWorkOrder`, data, {
      headers: authHeader(),
    });
  };
}
export default new WorkOrderService();
