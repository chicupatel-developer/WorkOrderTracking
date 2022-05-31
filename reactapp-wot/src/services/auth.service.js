import http from "../auth-http-common";

class AuthService {
  login = async (data) => {
    return await http.post(`/login`, data);
  };
}
export default new AuthService();
