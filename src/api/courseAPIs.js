import {notify} from "../utils/notification";
import {formDataAxios, jsonAxios} from "./api.base.url";

export const getAllCourses = async (page, searchValue, size, home) => {
    try {
        if (searchValue) {
            const response = await jsonAxios.get(
                `/api/v1/course/paging?page=${page}&size=${size}&title=${searchValue}`
            );
            return response.data;
        } else if (home) {
            const response = await jsonAxios.get(
                `/api/v1/course/paging?page=${page}&size=${size}&home=${home}`
            );
            return response.data;
        } else {
            const response = await jsonAxios.get(
                `/api/v1/course/paging?page=${page}&size=${size}`
            );
            return response.data;
        }
    } catch (error) {
        notify("error", "Có lỗi xảy ra khi lấy dữ liệu getAllCourses");
    }
};

export const getMyCourses = async () => {
    try {
        const response = await jsonAxios.get(
            `api/v1/course/get-my-course`
        );
        return response.data;
    } catch (error) {
        notify("error", "Có lỗi xảy ra khi lấy dữ liệu getMyCourses");
    }
};

export const getCourseMostRegistered = async (page, size) => {
    try {
        const response = await jsonAxios.get(
            `/api/v1/course/paging-course-most-registered?page=${page}&size=${size}`
        );
        return response.data;
    } catch (error) {
        notify("error", "Có lỗi xảy ra khi lấy dữ liệu getCourseMostRegistered");
    }
};

export const getCourseFavourite = async (page, size) => {
    try {
        const response = await jsonAxios.get(
            `/api/v1/course/paging-course-favourite?page=${page}&size=${size}`
        );
        return response.data;
    } catch (error) {
        notify("error", "Có lỗi xảy ra khi lấy dữ liệu getCourseFavourite");
    }
};

export const getOneCourses = async (id) => {
    try {
        const response = await jsonAxios.get(`/api/v1/course/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const addNewCourse = async (newCourse) => {
    let formData = new FormData();
    formData.append("title", newCourse.title);
    formData.append("imageFile", newCourse.imageFile);
    formData.append("description", newCourse.description);
    formData.append("subDescription", newCourse.subDescription);
    formData.append("price", newCourse.price);
    try {
        const response = await formDataAxios.post("/api/v1/course/save", formData);
        notify("success", "Thêm khóa học thành công");
        return response;
    } catch (error) {
        if (error.response.status === 401) {
            notify("error", "Bạn không có quyền");
        } else {
            notify("error", "Có lỗi xảy ra khi thêm");
        }
    }
};
export const editCourse = async (course) => {
    let formData = new FormData();
    if (course.imageFile) {
        formData.append("imageFile", course.imageFile);
    }
    formData.append("title", course.title);
    formData.append("description", course.description);
    formData.append("subDescription", course.subDescription);
    formData.append("voided", course.voided);
    formData.append("price", course.price);
    try {
        const response = await formDataAxios.put(
            `/api/v1/course/update/${course.id}`,
            formData
        );
        notify("success", "Sửa khóa học thành công");
        return response;
    } catch (error) {
        if (error.response.status === 401) {
            notify("error", "Bạn không có quyền");
        } else {
            notify("error", "Có lỗi xảy ra khi sửa");
        }
    }
};
export const deleteCourse = async (id) => {
    try {
        const response = await formDataAxios.delete(`/api/v1/course/${id}`);
        notify("success", "Xóa khóa học thành công");
        return response;
    } catch (error) {
        notify("error", error.response.data);
    }
};

export const getImgCourse = async (url) => {
    try {
        return await formDataAxios.get(`/img/${url}`);
    } catch (error) {
        notify("error", error.response.data);
    }
};