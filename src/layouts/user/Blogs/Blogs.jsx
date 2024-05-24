import React, { Fragment } from "react";
import BlogCard from "../../../components/BlogCard/BlogCard";

export default function Blogs() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <section className="section latest-blog">
      <div className="container">
        <div className="section-header aos" data-aos="fade-up">
          <div className="section-sub-head feature-head text-center mb-0">
            <h2>Các bài viết</h2>
            <div className="section-text aos" data-aos="fade-up">
              <p className="mb-0">Tổng hợp các bài viết </p>
            </div>
          </div>
        </div>
        <div
          className="owl-carousel blogs-slide owl-theme aos"
          data-aos="fade-up"
        >
          {data?.map((item, index) => (
            <Fragment key={index}>
              <BlogCard item={item} />
            </Fragment>
          ))}
        </div>
        <div className="enroll-group aos" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="total-course d-flex align-items-center">
                <div className="blur-border">
                  <div className="enroll-img">
                    <img
                      src="assets/img/icon/icon-07.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="course-count">
                  <h3>
                    <span className="counterUp">253,085</span>
                  </h3>
                  <p>STUDENTS ENROLLED</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="total-course d-flex align-items-center">
                <div className="blur-border">
                  <div className="enroll-img">
                    <img
                      src="assets/img/icon/icon-08.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="course-count">
                  <h3>
                    <span className="counterUp">1,205</span>
                  </h3>
                  <p>TOTAL COURSES</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="total-course d-flex align-items-center">
                <div className="blur-border">
                  <div className="enroll-img">
                    <img
                      src="assets/img/icon/icon-09.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="course-count">
                  <h3>
                    <span className="counterUp">127</span>
                  </h3>
                  <p>COUNTRIES</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lab-course">
          <div className="section-header aos" data-aos="fade-up">
            <div className="section-sub-head feature-head text-center">
              <h2>
                Unlimited access to 360+ courses <br />
                and 1,600+ hands-on labs
              </h2>
            </div>
          </div>
          <div className="icon-group aos" data-aos="fade-up">
            <div className="offset-lg-1 col-lg-12">
              <div className="row">
                <div className="col-lg-1 col-3">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img">
                        <img
                          src="assets/img/icon/icon-09.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-3">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img">
                        <img
                          src="assets/img/icon/icon-10.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-3">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img">
                        <img
                          src="assets/img/icon/icon-16.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-3">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img">
                        <img
                          src="assets/img/icon/icon-12.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-3">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img">
                        <img
                          src="assets/img/icon/icon-13.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-3">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img">
                        <img
                          src="assets/img/icon/icon-14.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-3">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img">
                        <img
                          src="assets/img/icon/icon-15.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-3">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img">
                        <img
                          src="assets/img/icon/icon-16.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-3">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img">
                        <img
                          src="assets/img/icon/icon-17.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-3">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img">
                        <img
                          src="assets/img/icon/icon-18.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
