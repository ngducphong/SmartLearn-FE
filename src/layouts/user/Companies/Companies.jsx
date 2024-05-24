import React from "react";

export default function Companies() {
  return (
    <section className="section lead-companies">
      <div className="container">
        <div className="section-header aos" data-aos="fade-up">
          <div className="section-sub-head feature-head text-center">
            <span>Doanh nghiệp liên kết</span>
            <h2>500+ trường đại học và các doanh nghiệp hàng đầu</h2>
          </div>
        </div>
        <div className="lead-group aos" data-aos="fade-up">
          <div className="lead-group-slider owl-carousel owl-theme">
            <div className="item">
              <div className="lead-img">
                <img
                  className="img-fluid"
                  alt=""
                  src="assets/img/lead-01.png"
                />
              </div>
            </div>
            <div className="item">
              <div className="lead-img">
                <img
                  className="img-fluid"
                  alt=""
                  src="assets/img/lead-02.png"
                />
              </div>
            </div>
            <div className="item">
              <div className="lead-img">
                <img
                  className="img-fluid"
                  alt=""
                  src="assets/img/lead-03.png"
                />
              </div>
            </div>
            <div className="item">
              <div className="lead-img">
                <img
                  className="img-fluid"
                  alt=""
                  src="assets/img/lead-04.png"
                />
              </div>
            </div>
            <div className="item">
              <div className="lead-img">
                <img
                  className="img-fluid"
                  alt=""
                  src="assets/img/lead-05.png"
                />
              </div>
            </div>
            <div className="item">
              <div className="lead-img">
                <img
                  className="img-fluid"
                  alt=""
                  src="assets/img/lead-06.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
