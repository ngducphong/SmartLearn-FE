import { notify } from "../utils/notification";
import {formDataAxios, jsonAxios} from "./api.base.url";

export const getAllLessons = async () => {
  try {
    const response = await jsonAxios.get("api/v1/lesson/get-all");
    return response.data;
  } catch (error) {
    notify("error", "Bạn không có quyền xem trang này");
  }
};
// export const addNewLesson2 = async (infoLesson) => {
//   let lesson = {
//     title: infoLesson.title,
//     description: infoLesson.description,
//     video: infoLesson.linkVideo,
//     resources: infoLesson.source,
//     chapterDto: {
//       id: infoLesson.chapterId,
//     },
//   };
//   try {
//     const response = await jsonAxios.post("api/v1/lesson/save", lesson);
//     notify("success", "Thêm bài học thành công");
//     return response;
//   } catch (error) {
//     console.log("Có lỗi khi thêm bài học", error);
//     notify("error", "Có lỗi khi thêm bài học");
//   }
// };

export const addNewLesson = async (infoLesson) => {
  let formData = new FormData();
  formData.append("title", infoLesson.title);
  formData.append("description", infoLesson.description);
  formData.append("resources", infoLesson.source);
  formData.append("chapterId", infoLesson.chapterId);
  formData.append("document", infoLesson.document);
  infoLesson.videoFile && formData.append("videoFile", infoLesson.videoFile);
  try {
    const response = await formDataAxios.post("api/v1/lesson/save", formData);
    notify("success", "Thêm bài học thành công");
    return response;
  } catch (error) {
    console.log("Có lỗi khi thêm bài học", error);
    notify("error", "Có lỗi khi thêm bài học");
  }
};

// export const editLesson2 = async (infoLesson) => {
//   let lesson = {
//     title: infoLesson.title,
//     description: infoLesson.description,
//     video: infoLesson.video || infoLesson.linkVideo,
//     resources: infoLesson.source,
//     chapterDto: {
//       id: infoLesson.chapterId,
//     },
//   };
//   try {
//     const response = await jsonAxios.put(
//       `api/v1/lesson/update/${infoLesson.id}`,
//       lesson
//     );
//     notify("success", "Sửa bài học thành công");
//     return response;
//   } catch (error) {
//     console.log(error);
//     notify("error", "Có lỗi khi sửa bài học");
//   }
// };

export const editLesson = async (infoLesson) => {
  let formData = new FormData();
  formData.append("title", infoLesson.title);
  formData.append("description", infoLesson.description);
  formData.append("resources", infoLesson.source);
  formData.append("chapterId", infoLesson.chapterId);
  formData.append("document", infoLesson.document);
  infoLesson.videoFile && formData.append("videoFile", infoLesson.videoFile);
  try {
    const response = await formDataAxios.put(
        `api/v1/lesson/update/${infoLesson.id}`,
        formData
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
