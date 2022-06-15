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
}
export default new WorkOrderService();
