import axios from "axios";
const API_URL = "http://localhost:5030/textile-valley/auth";


const login = async (username, password) => {

    const userdetails = {
        "userName" : username,
        "password" : password
    }
  
  const response = await axios
    .post("http://localhost:5030/textile-valley/auth/login", userdetails);
  if (response.data) {
    localStorage.setItem("TOKEN", JSON.stringify(response.data));
  }
    
};


const logout = () => {
  localStorage.removeItem("TOKEN");
};


const getCurrentUser = () => {
  //console.log(localStorage.getItem("TOKEN"));
  return JSON.parse(localStorage.getItem("TOKEN"));
};

const getCurrentUsername = () => {
  
};


const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUsername
};


export default AuthService;
