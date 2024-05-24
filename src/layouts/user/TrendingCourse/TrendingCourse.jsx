import React, { Fragment, memo, useEffect } from "react";
import CardCourseTrending from "../../../components/CardCourseTrending.jsx/CardCourseTrending";
import TeacherCard from "../../../components/TeacherCard/TeacherCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesAPI } from "../../../redux/reducer/courseSlice";
import { Link } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";

function TrendingCourse({ allCourses, isLoading }) {
  const teacher = [
    {
      img: "assets/img/teacher/t1.jpg",
      name: "Nguyễn Duy Quang",
      role: "Trưởng phòng đào tạo",
      detail: "Kỹ sư Công Nghệ thông tin",
      certificate: "Chứng chỉ Oracle - OCA",
      certificateGlobal: "Chứng chỉ Aptech toàn cầu",
      Pedagogy: "Chứng chỉ sư phạm",
    },
    {
      img: "assets/img/teacher/t2.jpg",
      name: "Tạ Sơn Tùng",
      role: "Cố vấn",
      detail: "Giáo sư",
      certificate: "Top 30 Forbes Under 30, 2015",
    },
    {
      img: "assets/img/teacher/t3.jpg",
      name: "Phan Thế Dũng",
      role: "Cố vấn",
      detail: "Tiến sĩ",
      certificate: "Đại học Bách Khoa Hà Nội & Keio Japan",
    },
    {
      img: "assets/img/teacher/t4.jpg",
      name: "Nguyễn Viết Lâm",
      role: "Phó phòng đào tạo",
      detail: "Kỹ sư Công Nghệ thông tin",
      certificate: "Đại học Bách Khoa Hà Nội & Keio Japan",
    },
  ];

  return (
    <section className="section trend-course">
      <div className="container">
        <div className="section-header aos" data-aos="fade-up">
          <div className="section-sub-head">
            <span> Khoá học được yêu thích nhiều nhất</span>
            <h2>Các khóa học HOT</h2>
          </div>
          <div className="all-btn all-category d-flex align-items-center">
            <Link to="/courses" className="btn btn-primary">
              Tất cả các khóa học
            </Link>
          </div>
        </div>
        <div className="section-text aos" data-aos="fade-up">
          <p className="mb-0">
            Các khóa học hot với những công nghệ mới nhất hiện nay
          </p>
        </div>
        <div
          className="owl-carousel trending-course owl-theme aos"
          data-aos="fade-up"
        >
          {isLoading ? (
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress style={{ color: "red" }} />
            </Grid>
          ) : (
            <>
              {allCourses?.map((item, index) => (
                <Fragment key={index}>
                  <CardCourseTrending item={item} />
                </Fragment>
              ))}
            </>
          )}
        </div>
        <div className="feature-instructors">
          <div className="section-header aos" data-aos="fade-up">
            <div className="section-sub-head feature-head text-center">
              <h2>Đội ngũ giảng viên</h2>
              <div className="section-text aos" data-aos="fade-up">
                <p className="mb-0">
                  Tự hào có đội ngũ cố vấn và giảng viên xuất
                  sắc, tin cậy, đảm bảo mang đến trải nghiệm học tập tuyệt vời
                  nhất, giúp học viên phát triển toàn diện
                </p>
              </div>
            </div>
          </div>
          <div
            className="owl-carousel instructors-course owl-theme aos"
            data-aos="fade-up"
          >
            {teacher?.map((item, index) => (
              <Fragment key={index}>
                <TeacherCard item={item} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default memo(TrendingCourse);
