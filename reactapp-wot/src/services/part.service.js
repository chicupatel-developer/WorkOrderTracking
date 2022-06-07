import http from "../axios/part-http-common";
import authHeader from "./auth.header";

class PartService {
  allParts = async () => {
    return await http.get(`/allParts`, {
      headers: authHeader(),
    });
  };

  createPart = async (data) => {
    return await http.post(`/createPart`, data, {
      headers: authHeader(),
    });
  };

  getPart = async (partId) => {
    return await http.get(`/getPart/${partId}`, {
      headers: authHeader(),
    });
  };

  editPart = async (data) => {
    return await http.post(`/editPart`, data, {
      headers: authHeader(),
    });
  };

  removePart = async (data) => {
    return await http.post(`/removePart`, data, {
      headers: authHeader(),
    });
  };

  upload = (file, onUploadProgress) => {
    let formData = new FormData();
    formData.append("partImage", file, file.name);
    formData.append("partId", 2);
    return http.post("/partImageUpload", formData, {
      headers: authHeader(),
      onUploadProgress,
    });
  };
}
export default new PartService();
