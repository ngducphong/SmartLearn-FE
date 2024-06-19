import { notify } from "../utils/notification";
import {formDataAxios, jsonAxios} from "./api.base.url";

export const getAllComments = async () => {
  try {
    const response = await jsonAxios.get("api/v1/comment/get-all");
    return response.data;
  } catch (error) {
    notify("error", "Bạn không có quyền xem trang này");
  }
};

export const getCommentsById = async (id) => {
  try {
    const response = await jsonAxios.get(`api/v1/comment/${id}`);
    return response.data;
  } catch (error) {
    notify("error", "Bạn không có quyền xem trang này");
  }
};

export const listCommentByLesson = async (lessonId) => {
  try {
    const response = await jsonAxios.get(`api/v1/comment/list-comment-by-lesson/${lessonId}`);
    return response.data;
  } catch (error) {
    notify("error", "Bạn không có quyền listCommentByLesson");
  }
};

export const getCommentParent = async () => {
  try {
    const response = await jsonAxios.get("api/v1/comment/paging-comment-parent");
    return response.data;
  } catch (error) {
    notify("error", "Bạn không có quyền xem trang này");
  }
};

export const getCommentChildrenByParentId = async (id) => {
  try {
    const response = await jsonAxios.get(`api/v1/comment/paging-comment-children?parentId=${id}`);
    return response.data;
  } catch (error) {
    notify("error", "Bạn không có quyền xem trang này");
  }
};

export const addNewComment = async (infoComment) => {
  let comment = {
    content: infoComment.content,
    lesson: {
      id: infoComment.lessonId,
    },
  };

  if (infoComment.commentId) {
    comment.comment = {
      id: infoComment.commentId,
    };
  }

  try {
    const response = await jsonAxios.post("api/v1/comment/save", comment);
    notify("success", "Thêm bài bình luận thành công");
    return response.data;
  } catch (error) {
    console.log("Có lỗi khi thêm bình luận", error);
    notify("error", "Có lỗi khi thêm bình luận");
  }
};

export const editComment = async (infoComment) => {
  let comment = {
    content: infoComment.content,
    lesson: {
      id: infoComment.lessonId,
    },
  };

  if (infoComment.commentId) {
    comment.comment = {
      id: infoComment.commentId,
    };
  }

  try {
    const response = await jsonAxios.put(
      `api/v1/comment/update/${infoComment.id}`,
        comment
    );
    notify("success", "Sửa bình luận thành công");
    return response;
  } catch (error) {
    console.log(error);
    notify("error", "Có lỗi khi sửa bình luận");
  }
};

export const deleteComment = async (id) => {
  try {
    await jsonAxios.delete(`api/v1/comment/${id}`);
    notify("success", "Xóa bình luận thành công");
  } catch (error) {
    console.log("Có lỗi khi xóa bình luận", error);
    notify("error", "Có lỗi khi xóa bình luận ");
  }
};
