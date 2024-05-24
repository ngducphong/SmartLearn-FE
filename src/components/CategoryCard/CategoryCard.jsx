import React from "react";

export default function CategoryCard({ item }) {
  return (
    <div className="feature-box text-center">
      <div className="feature-bg">
        <div className="feature-header">
          <div className="feature-icon">
            <img src={"http://localhost:8080/img/"+item.image} alt="" />
          </div>
          <div className="feature-cont">
            <div className="feature-text">{item.title}</div>
          </div>
        </div>
        <p>45 Instructors</p>
      </div>
    </div>
  );
}
