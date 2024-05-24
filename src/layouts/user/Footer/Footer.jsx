import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top aos" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget footer-about">
                <div className="footer-logo">
                  <img
                      src="assets/img/img.png"
                      className="logo-local-large"
                      alt="Logo"
                  />
                </div>
                <div className="footer-about-content">
                  <p>
                    SmartLearn cam kết cung cấp nền tảng giáo dục và đào
                    tạo hiện đại, đưa công nghệ thông tin đến thế hệ trẻ Việt
                    Nam.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">Khóa học</h2>
                <ul>
                  <li>
                    <a href="/">Cho người mới bắt đầu</a>
                  </li>
                  <li>
                    <a href="/">Lập trình viên nhật bản</a>
                  </li>
                  <li>
                    <a href="/">Kỹ sư CNTT - PTIT</a>
                  </li>
                  <li>
                    <a href="/">Data Analyst - HUST</a>
                  </li>

                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="footer-widget footer-contact">
                <h2 className="footer-title">Liên hệ</h2>

                <div className="footer-contact-info">
                  <div className="footer-address">
                  </div>
                  <p>
                    <img
                      src="assets/img/icon/icon-19.svg"
                      alt=""
                      className="img-fluid"
                    />
                    <a
                      href="/"
                      className="__cf_email__"
                      data-cfemail="1571677074786679786655706d74786579703b767a78"
                    >
                      ng.duc.phong010402@gmail.com
                    </a>
                  </p>
                  <p className="mb-0">
                    <img
                      src="assets/img/icon/icon-21.svg"
                      alt=""
                      className="img-fluid"
                    />
                    0353712221
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6">
                <div className="privacy-policy">
                  <ul>
                    <li>
                      <a href="">Terms</a>
                    </li>
                    <li>
                      <a href="">Privacy</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="copyright-text">
                  <p className="mb-0">
                    Copyright 2024 © ngducphong
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
