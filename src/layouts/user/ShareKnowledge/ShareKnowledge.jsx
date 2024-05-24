import React from "react";

export default function ShareKnowledge() {
  return (
    <section className="section share-knowledge">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="knowledge-img aos" data-aos="fade-up">
              <img src="assets/img/share.png" alt="" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="join-mentor aos" data-aos="fade-up">
              <h2>
                Bạn muốn chia sẻ kiến thức của bản thân? Tham gia cùng đội ngũ
                giảng viên của chúng tôi
              </h2>
              <p>
                High-definition video is video of higher resolution and quality
                than standard-definition. While there is no standardized meaning
                for high-definition, generally any video.
              </p>
              <ul className="course-list">
                <li>
                  <i className="fa-solid fa-circle-check" />
                  Những khóa học tốt nhất
                </li>
                <li>
                  <i className="fa-solid fa-circle-check" />
                  Top rated Instructors
                </li>
              </ul>
              <div className="all-btn all-category d-flex align-items-center">
                <a
                  href="https://www.facebook.com/profile.php?id=100012236193919"
                  target="_blank"
                  className="btn btn-primary"
                >
                  Tìm hiểu thêm
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
