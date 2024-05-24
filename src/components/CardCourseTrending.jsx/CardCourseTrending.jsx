import React from "react";
import { Link } from "react-router-dom";

export default function CardCourseTrending({ item }) {
  return (
    <div className="course-box trend-box cursor-pointer">
      <div className="product trend-product">
        <div className="product-img">
          <Link to={`/courseDetail/${item.id}`}>
            <img className="img-fluid" alt="" src={item.image} />
          </Link>
        </div>
        <div className="product-content">
          <div className="course-group d-flex">
            <div className="course-group-img d-flex">
              <a href="">
                <img
                  src="assets/img/user/user.jpg"
                  alt=""
                  className="img-fluid"
                />
              </a>
              <div className="course-name">
                <h4>
                  <a href="">John Michael</a>
                </h4>
                <p>Instructor</p>
              </div>
            </div>
            <div className="course-share d-flex align-items-center justify-content-center">
              <a href="#">
                <i className="fa-regular fa-heart" />
              </a>
            </div>
          </div>
          <h3 className="title">
            <a href="">{item.title}</a>
          </h3>
          <div className="course-info d-flex align-items-center">
            <div className="rating-img d-flex align-items-center">
              <img
                src="assets/img/icon/icon-01.svg"
                alt=""
                className="img-fluid"
              />
              <p>13+ Lesson</p>
            </div>
            <div className="course-view d-flex align-items-center">
              <img
                src="assets/img/icon/icon-02.svg"
                alt=""
                className="img-fluid"
              />
              <p>10hr 30min</p>
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
          {/* <div className="all-btn all-category d-flex align-items-center">
            <a href="checkout.html" className="btn btn-primary">
              BUY NOW
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}
