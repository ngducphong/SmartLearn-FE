import React from "react";

export default function BlogCard() {
  return (
    <div className="instructors-widget blog-widget">
      <div className="instructors-img">
        <a href="">
          <img className="img-fluid" alt="" src="assets/img/blog/blog-04.jpg" />
        </a>
      </div>
      <div className="instructors-content text-center">
        <h5>
          <a href="">A Solution Built for Teachers</a>
        </h5>
        <p>Marketing</p>
        <div className="student-count d-flex justify-content-center">
          <i className="fa-solid fa-calendar-days" />
          <span>April 15, 2022</span>
        </div>
      </div>
    </div>
  );
}
