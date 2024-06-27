import React, { useState } from "react";
import { loginApi } from "../../../api/userAPIs";
import Cookies from "js-cookie";
import { notify } from "../../../utils/notification";
import FormAddCategory from "../../../components/form/FormAddCategory.jsx";
import FormForgotPassword from "../../../components/form/FormForgotPassword.jsx";
import {Button} from "antd";
import {editCategory} from "../../../api/categoryAPIs.js";
import {resetPassword} from "../../../api/resetPasswordAPIs.js";

export default function Login() {
  // region state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogining, setIsLogining] = useState(false);
  const [isFormForgotPassword, setIsFormForgotPassword] = useState(false);
  const closedFormForgotPassword = () => {
    setIsFormForgotPassword(false);
  };
  // end region
  // Hàm đăng nhập
  const login = async () => {
    setIsLogining(true);
    try {
      const response = await loginApi({ username, password });
      const { accessToken, expired, roles, fullName } = response?.data;
      localStorage.setItem("user", fullName);
      localStorage.setItem("roles", JSON.stringify(roles));
      // Lưu accessToken vào cookies
      Cookies.set("accessToken", accessToken, {
        expires: expired / (24 * 60 * 60 * 1000),
        secure: true,
      });
      const check = roles.some(
        (item) => item === 'ROLE_ADMIN'
      );
      console.log("check : ");
      notify("success", "Đăng nhập thành công");
      //  // Xử lý chuyển hướng nếu cần
      if (check) {
        window.location.href = "/admin";
      }else {
        window.location.href = "/";
      }

    } catch (error) {
      console.log(error);
      notify("error", error.response.data || "Có lỗi xảy ra khi đăng nhập");
    } finally {
      setIsLogining(false);
    }
  };


  // Gọi hàm đăng nhập khi nhấn phím Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };
  return (
    <>
      <div className="main-wrapper log-wrap">
        <div className="row">
          <div className="col-md-6 login-bg">
            <div className="owl-carousel login-slide owl-theme">
              <div className="welcome-login">
                <div className="login-banner">
                  <img
                    src="assets/img/login-img.png"
                    className="img-fluid"
                    alt="Logo"
                  />
                </div>
                <div className="mentor-course text-center">
                  <h2>
                    Chào mừng bạn đến với <br />
                    <span className="text-smart-learn">SmartLearn</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 login-wrap-bg">
            <div className="login-wrapper">
              <div className="loginbox">
                <div className="w-100">
                  <div className="img-logo">
                    <img
                      src="assets/img/img.png"
                      className="logo-local"
                      alt="Logo"
                    />
                    <div className="back-home">
                      <a href="/">Quay lại</a>
                    </div>
                  </div>
                  <h1>Đăng nhập</h1>
                  <div className="input-block">
                    <label className="form-control-label">Tên đăng nhập</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên đăng nhập"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="input-block">
                    <label className="form-control-label">Mật khẩu</label>
                    <div className="pass-group">
                      <input
                        type="password"
                        className="form-control pass-input"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                      <span className="feather-eye toggle-password" />
                    </div>
                  </div>
                  <div className="forgot" style={{display:"inline-block"}}>
                    <span  style={{display:"block"}}>
                      <a className="forgot-link" href="/register">
                        Bạn chưa có tài khoản ?{" "}
                        <span className="text-rikkei">Tạo tài khoản</span>
                      </a>
                    </span>

                    <span  style={{display:"block"}}>
                      <Button type="link"  onClick={() => setIsFormForgotPassword(true)} style={{paddingLeft:"0px"}}>
                        <span className="text-rikkei">Quên mật khẩu ?</span>
                      </Button>
                    </span>

                    {
                      isFormForgotPassword
                        && (
                        <FormForgotPassword
                            closeForm={closedFormForgotPassword}
                        />
                    )}

                  </div>


                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-start"
                      onClick={login}
                    >
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
