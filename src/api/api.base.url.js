import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_API_URL;
// Tạo một instance cho việc gửi dữ liệu dạng form
export const formDataAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Tạo một instance cho việc gửi dữ liệu dạng JSON
export const jsonAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Hàm để lấy accessToken từ cookies
const getAuthToken = () => Cookies.get("accessToken");

// Thêm một interceptor request vào cả hai instance axios để thêm Authorization header
const addAuthToken = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Áp dụng interceptor cho cả hai instance
addAuthToken(formDataAxios);
addAuthToken(jsonAxios);
