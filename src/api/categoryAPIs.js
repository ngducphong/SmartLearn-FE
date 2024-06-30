import { notify } from "../utils/notification";
import { jsonAxios } from "./api.base.url";

export const getPageCategory = async (page, searchValue, size) => {
  try {
    if (searchValue) {
      let url = `/api/v1/category/paging?page=${page}&size=${size}`;
      if (searchValue.name) {
        url += `&name=${searchValue.name}`;
      }
      if (searchValue.createDate) {
        url += `&createDate=${searchValue.createDate}`;
      }
      if (searchValue.voided) {
        url += `&voided=${searchValue.voided}`;
      }

      const response = await jsonAxios.get(url);

      return response.data;
    } else {
      const response = await jsonAxios.get(
          `/api/v1/category/paging?page=${page}&size=${size}`
      );
      return response.data;
    }
  } catch (error) {
    notify("error", "Có lỗi xảy ra khi lấy dữ liệu getPageCategory");
  }
};

export const getAllCategory = async () => {
  try {
    const response = await jsonAxios.get("api/v1/category/get-all");
    return response.data;
  } catch (error) {
    notify("error", "Bạn không có quyền xem trang này");
  }
};
export const addNewCategory = async (infoCategory) => {
  let category = {
    name: infoCategory.name,
    description: infoCategory.description,
  };
  try {
    const response = await jsonAxios.post("api/v1/category/save", category);
    notify("success", "Thêm thành công");
    return response;
  } catch (error) {
    console.log("Có lỗi khi thêm", error);
    notify("error", "Có lỗi khi thêm");
  }
};
export const editCategory = async (infoCategory) => {
  let category = {
    voided: infoCategory.voided,
    name: infoCategory.name,
    description: infoCategory.description,
  };
  try {
    const response = await jsonAxios.put(
      `api/v1/category/update/${infoCategory.id}`,
        category
    );
    notify("success", "Sửa bài học thành công");
    return response;
  } catch (error) {
    console.log(error);
    notify("error", "Có lỗi khi sửa bài học");
  }
};
export const deleteCategory = async (id) => {
  try {
    await jsonAxios.delete(`api/v1/category/${id}`);
    notify("success", "Xóa thành công");
  } catch (error) {
    console.log("Có lỗi khi xóa", error);
    notify("error", "Có lỗi khi xóa");
  }
};

export const getCategoryByCourseId = async (id) => {
  try {
    const response = await jsonAxios.get(
        `api/v1/category/get-category-by-course/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    notify("error", "Bạn không có quyền xem trang này");
  }
};
