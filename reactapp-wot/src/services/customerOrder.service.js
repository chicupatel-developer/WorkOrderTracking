import http from "../axios/customerOrder-http-common";
import authHeader from "./auth.header";

class CustomerOrderService {
  allCustomerOrders = async () => {
    return await http.get(`/allCustomerOrders`, {
      headers: authHeader(),
    });
  };

  createCustomerOrder = async (data) => {
    return await http.post(`/createCustomerOrder`, data, {
      headers: authHeader(),
    });
  };

  getCustomerOrder = async (coId) => {
    return await http.get(`/getCustomerOrder/${coId}`, {
      headers: authHeader(),
    });
  };

  editCustomerOrder = async (data) => {
    return await http.post(`/editCustomerOrder`, data, {
      headers: authHeader(),
    });
  };
}
export default new CustomerOrderService();
