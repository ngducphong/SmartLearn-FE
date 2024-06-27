import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAllCoursesAPI } from "../../../redux/reducer/courseSlice";
import {getMyCourses, getOneCourses} from "../../../api/courseAPIs.js";
import {getChaptersThunk} from "../../../redux/reducer/chapterSlice.js";
import {getLessonsThunk} from "../../../redux/reducer/lessonSlice.js";
import {Dropdown, Space} from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  //#region redux
  const allCourses = useSelector((state) => state.courseSlice.courses);
  const dispatch = useDispatch();
  //#endregion
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser || null;
  });


  useEffect(() => {
    dispatch(getAllCoursesAPI({ page: 0, size: 6, home: "home" }));
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    Cookies.remove("accessToken");
    setUser(null);
    navigate("/");
  };

  const logout = () => {
    // Xóa accessToken từ cookies
    Cookies.remove("accessToken");

    // Xóa dữ liệu người dùng từ localStorage
    localStorage.clear();

    // Chuyển hướng người dùng về  trang chủ
    window.location.href = "/";
  };

  const items = [
    {
      label: (
          <div className="flex items-center gap-2">
            <PersonIcon className="h-4 w-4" />
            <span>Thông tin cá nhân</span>
          </div>
      ),
      key: "0",
    },
    {
      label: (
          <Link to={'/change-password'}>
          <div className="flex items-center gap-2">

              <KeyIcon />

              <span>Đổi mật khẩu</span>

          </div>
          </Link>
      ),
      key: "1",
    },
    {
      label: (
          <div className="flex items-center gap-2"
               onClick={logout}
          >
            <LogoutIcon />
            <span>Đăng xuất</span>
          </div>
      ),
      key: "3",
    },
  ];

  return (
    <header className="header">
      <div className="header-fixed">
        <nav className="navbar navbar-expand-lg header-nav scroll-sticky">
          <div className="container">
            <div className="navbar-header">
              <a id="mobile_btn" href="javascript:void(0);">
                <span className="bar-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </a>
              <a href="/" className="navbar-brand logo">
                <img
                    src="assets/img/img.png"
                    className="logo-local-large"
                    alt="Logo"
                />
              </a>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <a href="/" className="menu-logo">
                  <img
                      src="assets/img/img.png"
                      className="logo-local-large"
                      alt="Logo"
                  />
                </a>
                <a
                  id="menu_close"
                  className="menu-close"
                  href="javascript:void(0);"
                >
                  <i className="fas fa-times" />
                </a>
              </div>
              <ul className="main-nav">
                <li className="has-submenu active">
                  <a className="" href="/">
                    Trang chủ
                  </a>
                </li>
                <li className="has-submenu">

                  <NavLink to="/courses">
                    Khóa học
                    {/*<i className="fas fa-chevron-down" />*/}
                  </NavLink>
                  {/*<ul className="submenu">*/}
                  {/*  <li className="has-submenu">*/}
                  {/*    <Link to="/courses">Các khóa học</Link>*/}
                  {/*    <ul className="submenu">*/}
                  {/*      {allCourses?.map((item, index) => (*/}
                  {/*        <li key={index}>*/}
                  {/*          <Link to={user ? `/courseDetail/${item.id}` : '/login'}>*/}
                  {/*            {item.title}*/}
                  {/*          </Link>*/}
                  {/*        </li>*/}
                  {/*      ))}*/}
                  {/*    </ul>*/}
                  {/*  </li>*/}
                  {/*  {user && <li className="has-submenu">*/}
                  {/*    <a to="">Khóa học của tôi</a>*/}
                  {/*    <ul className="submenu">*/}
                  {/*      {myCourses?.map((item, index) => (*/}
                  {/*          <li key={index}>*/}
                  {/*            <Link to={user ? `/courseDetail/${item.id}` : '/login'}>*/}
                  {/*              {item.title}*/}
                  {/*            </Link>*/}
                  {/*          </li>*/}
                  {/*      ))}*/}
                  {/*    </ul>*/}
                  {/*  </li>}*/}
                  {/*</ul>*/}
                </li>

                {/*<li className="has-submenu">*/}
                {/*  <a href="">Bài viết</a>*/}
                {/*</li>*/}
                <li className="login-link">
                  <a href="/login">Login / Signup</a>
                </li>
              </ul>
            </div>
            <ul className="nav header-navbar-rht">
              {user ? (
                <>
                  <li className="nav-item">
                    <Dropdown
                        className="nav-link header-login cursor-pointer"
                        menu={{
                          items,
                        }}
                        trigger={["click"]}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <div className="flex items-center">
                            <div style={{paddingRight:"10px"}}>
                              Xin chào, {user}
                            </div>

                            <img
                                className="h-8 w-8 rounded-full border"
                                src="https://tse1.mm.bing.net/th?id=OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa&pid=Api&P=0&h=180"
                                alt="Ảnh đại diện"
                            />

                            <KeyboardArrowDownIcon className="text-[#65696E] cursor-pointer hover:text-[#5d6064]" />
                          </div>
                        </Space>
                      </a>
                    </Dropdown>
                  </li>
                  {/*<li className="nav-item">*/}
                  {/*  <a*/}
                  {/*    className="nav-link header-login cursor-pointer"*/}
                  {/*    onClick={handleLogout}*/}
                  {/*  >*/}
                  {/*    Đăng xuất*/}
                  {/*  </a>*/}
                  {/*</li>*/}
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link header-sign" href="/login">
                      Đăng nhập
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link header-login" href="/register">
                      Đăng ký
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
