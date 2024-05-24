import { notify } from "../utils/notification";
import { jsonAxios } from "./api.base.url";

export const getAllLessons = async () => {
  try {
    const response = await jsonAxios.get("api/v1/lesson/get-all");
    return response.data;
  } catch (error) {
    notify("error", "Bạn không có quyền xem trang này");
  }
};
export const addNewLesson = async (infoLesson) => {
  let lesson = {
    title: infoLesson.title,
    description: infoLesson.description,
    video: infoLesson.linkVideo,
    resources: infoLesson.source,
    chapterDto: {
      id: infoLesson.chapterId,
    },
  };
  try {
    const response = await jsonAxios.post("api/v1/lesson/save", lesson);
    notify("success", "Thêm bài học thành công");
    return response;
  } catch (error) {
    console.log("Có lỗi khi thêm bài học", error);
    notify("error", "Có lỗi khi thêm bài học");
  }
};
export const editLesson = async (infoLesson) => {
  let lesson = {
    title: infoLesson.title,
    description: infoLesson.description,
    video: infoLesson.video || infoLesson.linkVideo,
    resources: infoLesson.source,
    chapterDto: {
      id: infoLesson.chapterId,
    },
  };
  try {
    const response = await jsonAxios.put(
      `api/v1/lesson/update/${infoLesson.id}`,
      lesson
    );
    notify("success", "Sửa bài học thành công");
    return response;
  } catch (error) {
    console.log(error);
    notify("error", "Có lỗi khi sửa bài học");
  }
};
export const deleteLesson = async (id) => {
  try {
    await jsonAxios.delete(`api/v1/lesson/${id}`);
    notify("success", "Xóa bài học thành công");
  } catch (error) {
    console.log("Có lỗi khi xóa bài học", error);
    notify("error", "Có lỗi khi xóa bài học");
  }
};
