import React, { useEffect, useState } from "react";
import { register } from "../../../api/userAPIs";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../config/firebase.config";
import { CircularProgress } from "@mui/material";
import { notify } from "../../../utils/notification";

export default function Register() {
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [canSendOTP, setCanSendOTP] = useState(true);
  const [countdown, setCountdown] = useState(60);
  useEffect(() => {
    let intervalId;
    if (!canSendOTP && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown <= 0) {
      setCanSendOTP(true);
      setCountdown(60); // Reset đếm ngược
    }
    return () => clearInterval(intervalId);
  }, [canSendOTP, countdown]);
  const handleSendOTP = async () => {
    if (!phone) {
      notify("error", "Vui lòng điền số điện thoại hợp lệ");
      setIsRegistering(false);
      return;
    }
    setIsSendingOTP(true);
    try {
      const formattedPhone = phone.startsWith("+84") ? phone : `+84${phone}`;
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const response = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptcha
      );
      if (response.verificationId) {
        const recaptchaElement = document.getElementById("recaptcha");
        recaptchaElement.style.display = "none";
      }
      setConfirmation(response);
      setCanSendOTP(false);
      notify("success", "Gửi OTP thành công");
    } catch (error) {
      console.log(error);
      notify("error", error.response.data || "Gửi OTP thất bại");
    } finally {
      setIsSendingOTP(false);
    }
  };
  const verifyOTP = async () => {
    setIsRegistering(true);
    if (!fullName || !phone || !password) {
      notify("error", "Vui lòng điền đủ thông tin");
      setIsRegistering(false);
      return;
    }
    try {
      const data = await confirmation.confirm(otp);
      if (data) {
        await register({
          phone,
          fullName,
          password,
        });
        notify("success", "Đăng ký thành công");
      }
    } catch (error) {
      notify("error", error.response.data || "Có lỗi xảy ra khi đăng ký");
    } finally {
      setIsRegistering(false);
    }
  };
  // Gọi hàm đăng ký
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      verifyOTP();
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
                    <span className="toggle-password feather-eye" />
                    <span className="pass-checked">
                      <i className="feather-check" />
                    </span>
                  </div>
                </div>
                <div className="input-block">
                  <label className="form-control-label">Nhập OTP</label>
                  <div className="flex justify-between">
                    <input
                      type="number"
                      className="form-control !w-[80%]"
                      placeholder="Nhập OTP"
                      onChange={(e) => setOtp(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={isSendingOTP || !canSendOTP}
                      className="border-[#BC2228] bg-transparent hover:!bg-[#BC2228] hover:text-white text-[#BC2228] font-medium py-2 px-4 rounded"
                    >
                      {isSendingOTP ? (
                        <CircularProgress size={24} color="red" />
                      ) : canSendOTP ? (
                        "Gửi mã"
                      ) : (
                        `Gửi lại sau ${countdown}s`
                      )}
                    </button>
                  </div>
                </div>
                <div id="recaptcha"></div>
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
                    {isRegistering ? (
                      <CircularProgress size={24} color="red" />
                    ) : (
                      "Đăng ký"
                    )}
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
