import { notify } from "../utils/notification";
import { jsonAxios } from "./api.base.url";

export const getAllChapters = async (id) => {
  try {
    const response = await jsonAxios.get(
      `api/v1/chapter/get-chapters-by-course/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    notify("error", "Bạn không có quyền xem trang này");
  }
};

export const addNewChapter = async (newChapter) => {
  let chapter = {
    title: newChapter.title,
    description: newChapter.description,
    course: {
      id: newChapter.id,
    },
  };
  try {
    const response = await jsonAxios.post("api/v1/chapter/save", chapter);
    notify("success", "Thêm chương học thành công");
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const editChapterAPIs = async (infoChapter) => {
  let chapter = {
    title: infoChapter.title,
    description: infoChapter.description,
    course: {
      id: infoChapter.id,
    },
  };
  try {
    const response = await jsonAxios.put(
      `api/v1/chapter/update/${infoChapter.chapterId}`,
      chapter
    );
    notify("success", "Sửa chương học thành công");
    return response;
  } catch (error) {
    console.log(error);
  }
};
