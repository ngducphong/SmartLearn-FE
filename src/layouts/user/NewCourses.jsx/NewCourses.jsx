import React, { Fragment, memo } from "react";
import CourseCard from "../../../components/CourseCard/CourseCard";
import { CircularProgress, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function NewCourses({ allCourses, isLoading }) {
  return (
    <section className="section new-course">
      <div className="container">
        <div className="section-header aos" data-aos="fade-up">
          <div className="section-sub-head">
            <span>Khoá học được đăng ký nhiều nhất</span>
            <h2>Khóa học nổi bật</h2>
          </div>
          <div className="all-btn all-category d-flex align-items-center">
            <Link to="/courses" className="btn btn-primary">
              Tất cả các khóa học
            </Link>
          </div>
        </div>
        {/*<div className="section-text aos" data-aos="fade-up">*/}
        {/*  <p className="mb-0">*/}
        {/*    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean*/}
        {/*    accumsan bibendum gravida maecenas augue elementum et neque.*/}
        {/*    Suspendisse imperdiet.*/}
        {/*  </p>*/}
        {/*</div>*/}
        <div className="course-feature">
          <div className="row">
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
              allCourses?.map((item, index) => (
                <Fragment key={index}>
                  <CourseCard item={item} />
                </Fragment>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default memo(NewCourses);
