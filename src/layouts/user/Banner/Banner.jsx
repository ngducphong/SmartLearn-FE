import React from "react";

export default function Banner() {
  return (
    <>
      <section className="home-slide d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="home-slide-face aos" data-aos="fade-up">
                <div className="home-slide-text">
                  <h1>
                    <span className="!text-rikkei">SmartLearn</span>{" "}
                  </h1>
                  <p>Học thêm kiến thức, định hướng tương lai</p>
                </div>
                <div className="trust-user">
                  <p>
                    Hàng ngàn học viên đã và đang tham gia <br />
                    học tập trực tuyến cùng giảng viên
                  </p>
                  <div className="trust-rating d-flex align-items-center">
                    <div className="rate-head">
                      <h2>
                        <span>1000</span>+
                      </h2>
                    </div>
                    <div className="rating d-flex align-items-center">
                      <h2 className="d-inline-block average-rating">5.0</h2>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 d-flex align-items-center">
              <div className="girl-slide-img aos" data-aos="fade-up">
                <img
                  src="https://rikkei.edu.vn/wp-content/uploads/2024/01/banner-home1.png"
                  alt
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section student-course">
        <div className="container">
          <div className="course-widget">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="course-full-width">
                  <div
                    className="blur-border course-radius align-items-center aos"
                    data-aos="fade-up"
                  >
                    <div className="online-course d-flex align-items-center">
                      <div className="course-img">
                        <img src="assets/img/pencil-icon.svg" alt />
                      </div>
                      <div className="course-inner-content">
                        <h4>
                          <span>10</span>K
                        </h4>
                        <p>Bài giảng trực tuyến</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="course-full-width">
                  <div
                    className="blur-border course-radius aos"
                    data-aos="fade-up"
                  >
                    <div className="online-course d-flex align-items-center">
                      <div className="course-img">
                        <img src="assets/img/cources-icon.svg" alt />
                      </div>
                      <div className="course-inner-content">
                        <h4>
                          <span>200</span>+
                        </h4>
                        <p>Giảng viên dày dặn kinh nghiệm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="course-full-width">
                  <div
                    className="blur-border course-radius aos"
                    data-aos="fade-up"
                  >
                    <div className="online-course d-flex align-items-center">
                      <div className="course-img">
                        <img src="assets/img/certificate-icon.svg" alt />
                      </div>
                      <div className="course-inner-content">
                        <h4>
                          <span>6</span>K+
                        </h4>
                        <p>Khóa học bắt kịp xu thế hiện nay</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="course-full-width">
                  <div
                    className="blur-border course-radius aos"
                    data-aos="fade-up"
                  >
                    <div className="online-course d-flex align-items-center">
                      <div className="course-img">
                        <img src="assets/img/gratuate-icon.svg" alt />
                      </div>
                      <div className="course-inner-content">
                        <h4>
                          <span>60</span>K +
                        </h4>
                        <p>Học viên tham gia trực tuyến</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
