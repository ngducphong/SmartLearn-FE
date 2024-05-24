import React from "react";

export default function MasterSkill() {
  return (
    <section className="section master-skill">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="section-header aos" data-aos="fade-up">
              <div className="section-sub-head">
                <span>Bạn cảm thấy tự ti về các kĩ năng của mình?</span>
                <h2>Nâng cao kĩ năng để phát triển bản thân</h2>
              </div>
            </div>
            <div className="section-text aos" data-aos="fade-up">
              <p>
                Get certified, master modern tech skills, and level up your
                career — whether you’re starting out or a seasoned pro. 95% of
                eLearning learners report our hands-on content directly helped
                their careers.
              </p>
            </div>
            <div className="career-group aos" data-aos="fade-up">
              <div className="row">
                <div className="col-lg-6 col-md-6 d-flex">
                  <div className="certified-group blur-border d-flex">
                    <div className="get-certified d-flex align-items-center">
                      <div className="blur-box">
                        <div className="certified-img">
                          <img
                            src="assets/img/icon/icon-1.svg"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <p>
                        Tiếp cận và sử dụng thành thạo các công nghệ mới nhất
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 d-flex">
                  <div className="certified-group blur-border d-flex">
                    <div className="get-certified d-flex align-items-center">
                      <div className="blur-box">
                        <div className="certified-img">
                          <img
                            src="assets/img/icon/icon-2.svg"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <p>Đội ngũ giảng viên tận tình và chuyên nghiệp</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 d-flex">
                  <div className="certified-group blur-border d-flex">
                    <div className="get-certified d-flex align-items-center">
                      <div className="blur-box">
                        <div className="certified-img">
                          <img
                            src="assets/img/icon/icon-3.svg"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <p>Tiếp cận các công việc với mức lương cao</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 d-flex">
                  <div className="certified-group blur-border d-flex">
                    <div className="get-certified d-flex align-items-center">
                      <div className="blur-box">
                        <div className="certified-img">
                          <img
                            src="assets/img/icon/icon-4.svg"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <p>Chứng nhận hoàn thành khóa học được đánh giá cao</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 d-flex align-items-end">
            <div className="career-img aos" data-aos="fade-up">
              <img
                src="assets/img/right-banner.jpg"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
