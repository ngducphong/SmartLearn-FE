import React from "react";

export default function NotFound() {
  return (
    <div className="main-wrapper">
      <div className="error-box">
        <div className="error-logo">
          <a href="/">
            <img
              src="https://rikkei.edu.vn/wp-content/uploads/2024/01/logo-rikkei2.png"
              className="img-fluid"
              alt="Logo"
            />
          </a>
        </div>
        <div className="error-box-img">
          <img src="assets/img/error-01.png" alt="" className="img-fluid" />
        </div>
        <h3 className="h2 mb-3">Oh No! Error 404</h3>
        <p className="h4 font-weight-normal">Trang không tồn tại!</p>
        <a href="/" className="btn btn-primary">
          Quay lại trang chủ
        </a>
      </div>
    </div>
  );
}
