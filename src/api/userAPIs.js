import { notify } from "../utils/notification";
import { jsonAxios } from "./api.base.url";
export const getPhone = async (user) => {
  const infoUser = {
    phone: user.phone,
    fullName: user.fullName,
  };
  try {
    const response = await jsonAxios.post("/api/v1/user-clipboard", infoUser);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const register = async (infoUser) => {
  const newUser = {
    fullName: infoUser.fullName,
    phone: infoUser.phone,
    password: infoUser.password,
  };
  try {
    const response = await jsonAxios.post("/api/v1/user/register", newUser);
    notify("success", "Đăng ký thành công");
    return response;
  } catch (error) {
    notify("error", "Số điện thoại đã được đăng ký");
  }
};

export const loginApi = async (user) => {
  const infoUser = {
    username: user.username,
    password: user.password,
  };
  try {
    const response = await jsonAxios.post("/auth/login", infoUser);
    notify("success", "Đăng nhập thành công");
    return response;
  } catch (error) {
    console.log(error);
    notify("error", "Sai tài khoản hoặc mật khẩu");
  }
};

export const getAllUsers = async (searchQuery) => {
  try {
    if (searchQuery) {
      const response = await jsonAxios.get(
        `api/v1/user/page?name=${searchQuery}`
      );
      return response;
    } else {
      const response = await jsonAxios.get("api/v1/user/page");
      return response;
    }
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      notify("error", "Bạn không có quyền");
    } else {
      notify("error", "Có lỗi xảy ra khi lấy thông tin người dùng");
    }
  }
};
export const createUser = async (userData) => {
  try {
    await jsonAxios.post("api/v1/user/create-user", userData);
    notify("success", "Tạo người dùng thành công");
  } catch (error) {
    if (error.response.status === 401) {
      notify("error", "Bạn không có quyền");
    } else {
      notify("error", "Có lỗi xảy ra khi tạo người dùng");
    }
  }
};
export const editUserApi = async (userData) => {
  try {
    await jsonAxios.put(
      `/api/v1/user/admin/edit-user/${userData.id}`,
      userData
    );
    notify("success", "Sửa thông tin người dùng thành công");
  } catch (error) {
    if (error.response.status === 401) {
      notify("error", "Bạn không có quyền");
    } else if (error.response.status === 400) {
      notify("error", error.response.data);
    } else {
      notify("error", "Có lỗi xảy ra khi sửa người dùng");
    }
  }
};
