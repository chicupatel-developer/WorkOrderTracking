import http from "../auth-http-common";

class AuthService {
  login = async (data) => {
    return await http.post(`/login`, data);
  };

  getCurrentUser = () => {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser;
  };

  getCurrentUserFullName = () => {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser.fullName;
  };

  getToken = () => {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser.token;
  };

  getCurrentUserRole = () => {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser.role;
  };

  getCurrentUserName = () => {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser.userName;
  };
}
export default new AuthService();
