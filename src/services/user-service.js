import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5030/textile-valley/auth";


const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserInfo = () => {
    return axios.get("http://localhost:5030/textile-valley/auth/userinfo", { headers: authHeader() });
};



const UserService = {
  getPublicContent,
  getUserInfo
};

export default UserService;
