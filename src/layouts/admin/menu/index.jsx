import "./index.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ListIcon from "@mui/icons-material/List";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import {NavLink} from "react-router-dom";

export default function Menu() {
    return (
        <>
            <menu className="w-[200px] bg-[#041434] px-3 text-white pt-6 m-0 min-h-screen">
                <div className="flex flex-col gap-1" id="admin-menu">
                    <NavLink to="/admin" end className="no-underline">
                        <DashboardIcon/>
                        <span className="menu-text">Tổng quan</span>
                    </NavLink>
                    <NavLink to="user" className="no-underline">
                        <ManageAccountsIcon/>
                        <span className="menu-text">Người dùng</span>
                    </NavLink>
                    <NavLink to="category" className="no-underline">
                        <ListIcon/>
                        <span className="menu-text">Danh mục</span>
                    </NavLink>
                    <NavLink to="management" className="no-underline">
                        <LocalLibraryIcon/>
                        <span className="menu-text">Khóa học</span>
                    </NavLink>

                    {/*<NavLink to="post" className="no-underline">*/}
                    {/*  <PostAddIcon />*/}
                    {/*  <span className="menu-text">Bài viết</span>*/}
                    {/*</NavLink>*/}
                </div>
            </menu>
        </>
    );
}
