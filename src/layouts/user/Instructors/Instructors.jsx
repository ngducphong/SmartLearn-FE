import React from "react";

export default function Instructors() {
  return (
    <section className="section become-instructors aos" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 d-flex">
            <div className="student-mentor cube-instuctor">
              <h4>Become An Instructor</h4>
              <div className="row">
                <div className="col-lg-7 col-md-12">
                  <div className="top-instructors">
                    <p>
                      Top instructors from around the world teach millions of
                      students on Mentoring.
                    </p>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12">
                  <div className="mentor-img">
                    <img
                      className="img-fluid"
                      alt=""
                      src="assets/img/become-02.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 d-flex">
            <div className="student-mentor yellow-mentor">
              <h4>Transform Access To Education</h4>
              <div className="row">
                <div className="col-lg-8 col-md-12">
                  <div className="top-instructors">
                    <p>
                      Create an account to receive our newsletter, course
                      recommendations and promotions.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="mentor-img">
                    <img
                      className="img-fluid"
                      alt=""
                      src="assets/img/become-01.png"
                    />
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
