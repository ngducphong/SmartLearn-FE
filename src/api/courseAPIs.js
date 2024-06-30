import {notify} from "../utils/notification";
import {formDataAxios, jsonAxios} from "./api.base.url";

export const getAllCourses = async (page, searchValue, size, home, categories) => {
    try {
        if (searchValue && !categories) {
            let url = `/api/v1/course/paging?page=${page}&size=${size}`;

            if (searchValue.name) {
                url += `&title=${searchValue.name}`;
            }

            if (searchValue.createDate) {
                url += `&createDate=${searchValue.createDate}`;
            }

            if (searchValue.price) {
                url += `&price=${searchValue.price}`;
            }

            if (searchValue.voided) {
                url += `&voided=${searchValue.voided}`;
            }

            const response = await jsonAxios.get(url);

            return response.data;
        } else if (home) {
            const response = await jsonAxios.get(
                `/api/v1/course/paging?page=${page}&size=${size}&home=${home}`
            );
            return response.data;
        }else if (categories) {
            const courseIdsQuery = categories.map(id => `courses=${id}`).join('&');
            let url = `/api/v1/course/paging?page=${page}&size=${size}&${courseIdsQuery}`;
            if (searchValue && searchValue.name){
                url += `&title=${searchValue.name}`;
            }
            if (searchValue && searchValue.price) {
                url += `&price=${searchValue.price}`;
            }
            const response = await jsonAxios.get(
                url
            );
            return response.data;
        }else {
            const response = await jsonAxios.get(
                `/api/v1/course/paging?page=${page}&size=${size}`
            );
            return response.data;
        }
    } catch (error) {
        notify("error", "Có lỗi xảy ra khi lấy dữ liệu getAllCourses");
    }
};

export const getMyCourses = async (page, searchValue, size, categories, priceRange) => {
    try {
        if (searchValue || categories || priceRange) {
            let url = `/api/v1/course/get-my-course?page=${page}&size=${size}`;
            if (searchValue){
                url += `&title=${searchValue}`;
            }
            if (priceRange){
                url += `&price=${priceRange}`;
            }
            if (categories && categories.length > 0){
                const courseIdsQuery = categories?.map(id => `courses=${id}`).join('&');
                if (courseIdsQuery ){
                    url += `&${courseIdsQuery}`;
                }

            }
            const response = await jsonAxios.get(
                url
            );
            return response.data;
        } else {
            const response = await jsonAxios.get(
                `api/v1/course/get-my-course?page=${page}&size=${size}`
            );
            return response.data;
        }

    } catch (error) {
        console.log(error)
        notify("error", "Có lỗi xảy ra khi lấy dữ liệu getMyCourses");
    }
};

export const recommendCourseDtoById = async (id) => {
    try {
        const response = await jsonAxios.get(
            `/api/v1/course/recommend-course-by-id?id=${id}`
        );
        return response.data;
    } catch (error) {
        notify("error", "Có lỗi xảy ra khi lấy dữ liệu getMyCourses");
    }
};

export const recommendCourseByMyCourse = async () => {
    try {
        const response = await jsonAxios.get(
            `/api/v1/course/recommend-course-by-my-course`
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

export const checkRegisterCourse = async (id) => {
    try {
        const response = await jsonAxios.get(
            `/api/v1/course/check-register-course/${id}`
        );
        return response.data;
    } catch (error) {
        notify("error", "Có lỗi xảy ra khi lấy call api checkRegisterCourse");
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

export const getFullCourse = async (id) => {
    try {
        const response = await jsonAxios.get(`/api/v1/course/getFullCourse/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const addNewCourse = async (newCourse) => {
    let formData = new FormData();
    formData.append("title", newCourse.title);
    newCourse.imageFile && formData.append("imageFile", newCourse.imageFile); // Đảm bảo rằng imageFile là một đối tượng MultipartFile
    newCourse.price && formData.append("price", newCourse.price);
    formData.append("description", newCourse.description);
    formData.append("subDescription", newCourse.subDescription);
    formData.append("categoryId", newCourse.categoryId);
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
    formData.append("categoryId", course.categoryId);
    formData.append("title", course.title);
    formData.append("description", course.description);
    formData.append("subDescription", course.subDescription);
    formData.append("voided", course.voided);
    course.price && formData.append("price", course.price);
    formData.append("categoryId", course.categoryId);
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

export const favouriteCourse = async (id) => {
    try {
        const response = await jsonAxios.put(`/api/v1/user-course/favourite/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};