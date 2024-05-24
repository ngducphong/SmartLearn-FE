import { notify } from "../utils/notification";
import { jsonAxios } from "./api.base.url";
export const getAllRoles = async () => {
  try {
    const response = await jsonAxios.get("api/v1/role/get-all");
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      notify("error", "Bạn không có quyền");
    } else {
      notify("error", "Có lỗi xảy ra khi lấy dữ liệu roles");
    }
  }
};
