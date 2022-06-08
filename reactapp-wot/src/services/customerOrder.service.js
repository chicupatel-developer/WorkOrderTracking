import http from "../axios/customerOrder-http-common";
import authHeader from "./auth.header";

class CustomerOrderService {
  allCustomerOrders = async () => {
    return await http.get(`/allCustomerOrders`, {
      headers: authHeader(),
    });
  };
}
export default new CustomerOrderService();
