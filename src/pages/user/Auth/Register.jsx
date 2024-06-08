import React, {useEffect, useState} from "react";
import {register} from "../../../api/userAPIs";
import {CircularProgress} from "@mui/material";
import {notify} from "../../../utils/notification";

export default function Register() {
    const [phone, setPhone] = useState();
    const [username, setUsername] = useState();
    const [fullName, setFullName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const [isRegistering, setIsRegistering] = useState(false);


    const verifyOTP = async () => {
        setIsRegistering(true);
        if (!username || (!phone && !email) || !password) {
            notify("error", "Vui lòng điền đủ thông tin");
            setIsRegistering(false);
            return;
        }
        try {
            const response = await register({
                username,
                email,
                phone,
                fullName,
                password,
            });
            console.log(response)
            if (response.data === 'Success'){
                window.location.reload();
            }
            notify("error", response.data);
        } catch (error) {
            notify("error", error.response.data || "Có lỗi xảy ra khi đăng ký");
        } finally {
            setIsRegistering(false);
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
                                        Chào mừng bạn đến với <br/>
                                        <span className="text-smart-learn">SmartLearn</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 login-wrap-bg">
                        <div className="login-wrapper">
                            <div className="loginbox">
                                <div className="img-logo">
                                    <img
                                        src="assets/img/img.png"
                                        className="logo-local"
                                        alt="Logo"
                                    />
                                    <div className="back-home">
                                        <a href="/">Quay về trang chủ</a>
                                    </div>
                                </div>
                                <h1>Đăng ký</h1>
                                <div className="input-block">
                                    <label className="form-control-label">Tài khoản</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập tài khoản"
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                    />
                                </div>
                                <div className="input-block">
                                    <label className="form-control-label">Họ và tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập họ và tên"
                                        onChange={(e) => setFullName(e.target.value)}
                                        value={fullName}
                                    />
                                </div>
                                <div className="input-block">
                                    <label className="form-control-label">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </div>
                                <div className="input-block">
                                    <label className="form-control-label">Số điện thoại</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Nhập số điện thoại"
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={phone}
                                    />
                                </div>
                                <div className="input-block">
                                    <label className="form-control-label">Mật khẩu</label>
                                    <div className="pass-group" id="passwordInput">
                                        <input
                                            type="password"
                                            className="form-control pass-input"
                                            placeholder="Nhập mật khẩu"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                        />
                                        <span className="toggle-password feather-eye"/>
                                        <span className="pass-checked">
                                          <i className="feather-check"/>
                                        </span>
                                    </div>
                                </div>

                                <div className="forgot">
                                  <span>
                                    <a className="forgot-link" href="/login">
                                      Bạn đã có tài khoản?{" "}
                                        <span className="text-rikkei">Đăng nhập ngay</span>
                                    </a>
                                  </span>
                                </div>
                                <div className="d-grid">
                                    <button
                                        className="btn btn-primary btn-start"
                                        type="submit"
                                        onClick={verifyOTP}
                                        disabled={isRegistering}
                                    >
                                        Đăng ký
                                        {/*{isRegistering ? (*/}
                                        {/*    <CircularProgress size={24} color="red"/>*/}
                                        {/*) : (*/}
                                        {/*    "Đăng ký"*/}
                                        {/*)}*/}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
