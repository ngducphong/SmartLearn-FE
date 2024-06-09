import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getChaptersThunk } from "../../../redux/reducer/chapterSlice";
import { getLessonsThunk } from "../../../redux/reducer/lessonSlice";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {getFullCourse, getOneCourses} from "../../../api/courseAPIs";
import { notify } from "../../../utils/notification";
import Cookies from "js-cookie";

export default function CourseDetail() {
  const chapters = useSelector((state) => state.chapterSlice.chapters);
  const lesson = useSelector((state) => state.lessonSlice.lesson);
  const isLoading = useSelector((state) => state.chapterSlice.loading);
  const [currentCourse, setCurrentCourse] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleGetDataCourse = async () => {
    const courseInfo = await getFullCourse(id);
    setCurrentCourse(courseInfo);
  };
  useEffect(() => {
    handleGetDataCourse();
    dispatch(getChaptersThunk(id));
    dispatch(getLessonsThunk());
  }, [dispatch, id]);
  // Nhóm dữ liệu lại
  const groupedContentItems = chapters?.map((chapter) => {
    return {
      ...chapter,
      lessons: lesson.filter((item) => item.chapterId === chapter.id),
    };
  });
  const learningCourse = () => {
    const getAuthToken = () => Cookies.get("accessToken");
    if (!getAuthToken()) {
      return notify("error", "Đăng nhập để học ngay !");
    }
    navigate(`/course/learn/${id}`);
  };
  return (
    <div className="mt-[100px]">
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Trang chủ</a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link to="/courses">Khóa học</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      {currentCourse?.title}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inner-banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="instructor-wrap border-bottom-0 m-0">
                <div className="about-instructor align-items-center">

                </div>
              </div>
              <h2> {currentCourse?.title || "Tên khóa học"}</h2>
              <p>{currentCourse?.subDescription || "Sub Description"}</p>
              <div className="course-info d-flex align-items-center border-bottom-0 m-0 p-0">
                <div className="cou-info">
                  <img src="assets/img/icon/icon-01.svg" alt="" />
                  <p>{currentCourse?.totalChapter} chương học</p>
                </div>
                <div className="cou-info">
                  <img src="assets/img/icon/timer-icon.svg" alt="" />
                  <p>{currentCourse?.totalLesson} bài học</p>
                </div>
                <div className="cou-info">
                  <img src="assets/img/icon/people.svg" alt="" />
                  <p>{currentCourse?.totalUser} học viên</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="page-content course-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="card overview-sec">
                <div className="card-body">
                  <h5 className="subs-title">Tổng quan</h5>
                  <h6>Mô tả khóa học</h6>
                  <div
                    className="ckEditor"
                    dangerouslySetInnerHTML={{
                      __html: currentCourse?.description,
                    }}
                  />
                </div>
              </div>
              <div className="card content-sec">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <h5 className="subs-title">Course Content</h5>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                      <h6>{currentCourse?.totalChapter} chương</h6>
                    </div>
                  </div>
                  <div className="responsive-stack">
                    {" "}
                    {isLoading ? (
                      <Grid
                        item
                        xs={12}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <CircularProgress />
                      </Grid>
                    ) : (
                      <>
                        {groupedContentItems.length > 0 ? (
                          <div className="responsive-stack">
                            {" "}
                            {groupedContentItems?.map((chapter) => (
                              <Fragment key={chapter?.id}>
                                <Accordion
                                  sx={{ maxHeight: "50%" }}
                                  className=" font-medium text-[#170F49] responsive-stack-item"
                                >
                                  <AccordionSummary
                                    sx={{
                                      minHeight: "2rem",
                                      color: "#BC2228",
                                      borderRadius: "20px",
                                      fontSize: "16px",
                                    }}
                                  >
                                    <span className="font-bold">
                                      {chapter?.title}
                                    </span>
                                  </AccordionSummary>
                                  <div className="overflow-auto max-h-64 bg-white rounded-[20px] ">
                                    <Divider />
                                    {chapter?.lessons?.length > 0 ? (
                                      chapter.lessons?.map((item) => (
                                        <AccordionDetails
                                          sx={{
                                            height: "60px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            cursor: "pointer",
                                            alignItems: "center",
                                            fontSize: "16px",
                                            margin: "0 20px",
                                          }}
                                          key={item.id}
                                        >
                                          <p
                                            className={`max-w-full mt-3 font-bold`}
                                          >
                                            {item?.title}
                                          </p>
                                          <div className="">
                                            {item?.video ? (
                                              <img
                                                src="/assets/img/Playbtn.png"
                                                alt=""
                                                className="w-5 h-5"
                                              />
                                            ) : (
                                              <MenuBookIcon className="text-rikkei" />
                                            )}
                                          </div>
                                        </AccordionDetails>
                                      ))
                                    ) : (
                                      <div style={{ padding: "12px 16px" }}>
                                        Coming soon...
                                      </div>
                                    )}
                                  </div>
                                </Accordion>
                              </Fragment>
                            ))}
                          </div>
                        ) : (
                          <>
                            <h1>Coming Soon</h1>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">


                <div className="card feature-sec">
                    <div className="card-body">
                        <div className="cat-title">
                            <h4>Bao gồm</h4>
                        </div>
                        <ul>
                            <li>
                                <img
                                    src="assets/img/icon/timer.svg"
                                    className="me-2"
                                    alt=""
                                />
                                Bài học: <span>{currentCourse?.totalLesson}</span>
                            </li>
                            <li>
                                <img
                                    src="assets/img/icon/chapter.svg"
                                    className="me-2"
                                    alt=""
                                />
                                Chương học: <span>{currentCourse?.totalChapter}</span>
                            </li>
                            <li>
                                <img
                                    src="assets/img/icon/video.svg"
                                    className="me-2"
                                    alt=""
                                />
                                Học viên:<span> {currentCourse?.totalUser}</span>
                            </li>
                            <li>
                                <img
                                    src="assets/img/icon/chart.svg"
                                    className="me-2"
                                    alt=""
                                />
                                Số lượt yêu thích: <span>{currentCourse?.totalFavourite}</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div>
                            <div className="video-sec vid-bg">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="video-details">
                                            <div className="course-fee">
                                                <img src={currentCourse?.image} alt="" />
                                            </div>
                                            <div
                                                className="btn btn-enroll w-100"
                                                onClick={learningCourse}
                                            >
                                                Học ngay
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
