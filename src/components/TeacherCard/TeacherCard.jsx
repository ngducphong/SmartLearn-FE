import React from "react";

export default function TeacherCard({ item }) {
  return (
    <div className="instructors-widget">
      <div className="instructors-img w-4/5 h-4/5 m-auto mt-2">
        <a href="">
          <img className="img-fluid" alt="" src={item.img} />
        </a>
      </div>
      <div className="instructors-content text-center">
        <h5>
          <a className="text-[#231651]">{item.name}</a>
        </h5>
        <p>{item.role}</p>
        <div className="student-count d-flex justify-content-center">
          <i className="fa-solid fa-user-group" />
          <span>50 Students</span>
        </div>
      </div>
    </div>
  );
}
