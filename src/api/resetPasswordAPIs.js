import {jsonAxios} from "./api.base.url.js";
import {notify} from "../utils/notification.js";

export const resetPassword = async (infoUser) => {

  let resetPasswordRequest = {
  };
  if (infoUser.phone){
    resetPasswordRequest.phone = infoUser.phone
  }

  if (infoUser.email){
    resetPasswordRequest.email = infoUser.email
  }

  if (infoUser.email === "" && infoUser.phone === ""){
    console.log("Số điện thoại hoặc email không được trống");
    notify("error", "Số điện thoại hoặc email không được trống");
    return ;
  }

  try {
    const response = await jsonAxios.post("auth/reset-password", resetPasswordRequest);
    notify("success", "Lấy lại mật khẩu thành công");
    return response;
  } catch (error) {
    console.log("Có lỗi khi lấy lại mật khẩu", error);
    notify("error", "Có lỗi khi lấy lại mật khẩu");
  }
};