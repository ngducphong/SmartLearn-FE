import React from "react";
import { Link } from "react-router-dom";

export default function CourseList({ item, isLogin }) {
  return (
    <div className="col-lg-12 col-md-12 d-flex">
      <div className="course-box course-design list-course d-flex">
        <div className="product">
          <div className="product-img">
            <a href="">
              <img className="img-fluid" alt="" src={item.image} />
            </a>
          </div>
          <div className="product-content">
            <div className="head-course-title">
              <h3 className="title">
                <a>{item.title}</a>
              </h3>
              <div className="all-btn all-category d-flex align-items-center">
                <Link
                  to={isLogin ? `/courseDetail/${item.id}` : '/login'}
                  className="btn btn-primary"
                >
                  HỌC NGAY
                </Link>
              </div>
            </div>
            <div className="course-info border-bottom-0 pb-0 d-flex align-items-center">
              <div className="rating-img d-flex align-items-center">
                <img src="assets/img/icon/icon-01.svg" alt="" />
                <p>12+ Lesson</p>
              </div>
              <div className="course-view d-flex align-items-center">
                <img src="assets/img/icon/icon-02.svg" alt="" />
                <p>9hr 30min</p>
              </div>
            </div>
            <div className="rating">
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star" />
              <span className="d-inline-block average-rating">
                <span>4.0</span> (15)
              </span>
            </div>
            <div className="course-group d-flex mb-0">
              <div className="course-group-img d-flex">
                <a href="">
                  <img
                    src="assets/img/user/user1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                </a>
                <div className="course-name">
                  <h4>
                    <a href="">Rolands R</a>
                  </h4>
                  <p>Instructor</p>
                </div>
              </div>
              <div className="course-share d-flex align-items-center justify-content-center">
                <a href="#rate">
                  <i className="fa-regular fa-heart" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
