import {Navigate, Outlet} from "react-router-dom";
import Header from "../layouts/admin/header";
import Menu from "../layouts/admin/menu";

function isAdmin() {
    // Lấy thông tin người dùng từ localStorage hoặc sessionStorage
    const role = JSON.parse(localStorage.getItem("roles"));
    // Kiểm tra xem người dùng có đăng nhập và có vai trò là admin hay không
    const check = role?.some((item) => item === import.meta.env.VITE_ADMIN_ROLE);
    return check;
}

export default function PrivateRouter() {
    return (
        <>
            <Header/>
            <div className="flex ">
                <Menu/>
                {isAdmin() ? <Outlet/> : <Navigate to={"/"}/>}
            </div>
        </>
    );
}
