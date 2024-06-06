import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dynamic-blog-fbny.onrender.com/",
  //baseURL: "http://localhost:5000/",
});

export default axiosInstance;
