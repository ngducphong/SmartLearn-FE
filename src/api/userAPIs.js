import {notify} from "../utils/notification";
import {jsonAxios} from "./api.base.url";

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
        username: infoUser.username,
        email: infoUser.email,
        fullName: infoUser.fullName,
        phone: infoUser.phone,
        password: infoUser.password,
    };
    try {
        const response = await jsonAxios.post("/api/v1/user/register", newUser);
        notify("success", "Đăng ký thành công");
        return response;
    } catch (error) {
        notify("error", "Đăng ký không thành công");
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
            const search = searchQuery?.searchTerms;

            console.log( (search))

            let url = 'api/v1/user/page?';
            let params = [];

            if (search.name) {
                params.push(`name=${search.name}`);
            }

            if (search.username) {
                params.push(`username=${search.username}`);
            }

            if (search.email) {
                params.push(`email=${search.email}`);
            }

            if (search.phone) {
                params.push(`phone=${search.phone}`);
            }

            if (search.createDate) {
                params.push(`createDate=${search.createDate}`);
            }

            if (search.voided) {
                params.push(`voided=${search.voided}`);
            }

            if (search.role) {
                params.push(`role=${search.role}`);
            }

            url += params.join('&');

            const response = await jsonAxios.get(
                url
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
        const res = await jsonAxios.post("api/v1/user/create-user", userData);
        if (res.data === "Success"){
            notify("success", "Tạo người dùng thành công");
        }else {
            console.log(res.data)
            notify("error", res.data);
        }

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

export const changePassword = async (changePasswordRequest) => {
    try {
        await jsonAxios.put(
            "/api/v1/user/change-password",
            changePasswordRequest
        );
        notify("success", "Đổi mật khẩu thành công");
    } catch (error) {
        if (error.response.status === 401) {
            notify("error", "Bạn không có quyền");
        } else if (error.response.status === 400) {
            notify("error", error.response.data);
        } else {
            notify("error", "Có lỗi xảy ra khi đổi mật khẩu");
        }
    }
};

export const getUserAccountRegistrationData = async (year) => {
    try {
        year = year||2024
        const response = await jsonAxios.get(
            `/api/v1/user/get-user-account-registration-data?year=${year}`
        );
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            notify("error", "Bạn không có quyền");
        } else if (error.response.status === 400) {
            notify("error", error.response.data);
        } else {
            notify("error", "Có lỗi xảy ra khi getUserAccountRegistrationData");
        }
    }
};

export const getPaymentChartData = async (year) => {
    try {
        year = year||2024
        const response = await jsonAxios.get(
            `/api/v1/user/get-payment-chart-data?year=${year}`
        );
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            notify("error", "Bạn không có quyền");
        } else if (error.response.status === 400) {
            notify("error", error.response.data);
        } else {
            notify("error", "Có lỗi xảy ra khi getPaymentChartData");
        }
    }
};