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
import { getOneCourses } from "../../../api/courseAPIs";
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
    const courseInfo = await getOneCourses(id);
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
                  {/* <div className="abt-instructor-img">
                    <a href="instructor-profile.html">
                      <img
                        src="assets/img/user/user1.jpg"
                        alt="img"
                        className="img-fluid"
                      />
                    </a>
                  </div> */}
                  {/* <div className="instructor-detail me-3">
                    <h5>
                      <a href="instructor-profile.html">Nicole Brown</a>
                    </h5>
                    <p>UX/UI Designer</p>
                  </div> */}
                  {/* <div className="rating mb-0">
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star" />
                    <span className="d-inline-block average-rating">
                      <span>4.5</span> (15)
                    </span>
                  </div> */}
                </div>
                <span className="web-badge mb-3">WEB DEVELOPMENT</span>
              </div>
              <h2> {currentCourse?.title || "Tên khóa học"}</h2>
              <p>{currentCourse?.subDescription || "Sub Description"}</p>
              <div className="course-info d-flex align-items-center border-bottom-0 m-0 p-0">
                <div className="cou-info">
                  <img src="assets/img/icon/icon-01.svg" alt="" />
                  <p>{chapters.length} chương học</p>
                </div>
                <div className="cou-info">
                  <img src="assets/img/icon/timer-icon.svg" alt="" />
                  <p>9hr 30min</p>
                </div>
                <div className="cou-info">
                  <img src="assets/img/icon/people.svg" alt="" />
                  <p>32 students enrolled</p>
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
                  <h6>What you'll learn</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <ul>
                        <li>Become a UX designer.</li>
                        <li>You will be able to add UX designer to your CV</li>
                        <li>Become a UI designer.</li>
                        <li>Build &amp; test a full website design.</li>
                        <li>Build &amp; test a full mobile app.</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                        <li>
                          Learn to design websites &amp; mobile phone apps.
                        </li>
                        <li>You'll learn how to choose colors.</li>
                        <li>Prototype your designs with interactions.</li>
                        <li>Export production ready assets.</li>
                        <li>All the techniques used by UX professionals</li>
                      </ul>
                    </div>
                  </div>
                  <h6>Requirements</h6>
                  <ul className="mb-0">
                    <li>
                      You will need a copy of Adobe XD 2019 or above. A free
                      trial can be downloaded from Adobe.
                    </li>
                    <li>No previous design experience is needed.</li>
                    <li className="mb-0">
                      No previous Adobe XD skills are needed.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card content-sec">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <h5 className="subs-title">Course Content</h5>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                      <h6>{chapters?.length} chương</h6>
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
              <div className="sidebar-sec">
                <div className="video-sec vid-bg">
                  <div className="card">
                    <div className="card-body">
                      <div className="video-details">
                        <div className="course-fee">
                          <img src={currentCourse?.image} alt="" />
                          <h2>FREE</h2>
                        </div>
                        <div className="row gx-2">
                          <div className="col-md-6">
                            <a
                              href="course-wishlist.html"
                              className="btn btn-wish w-100"
                            >
                              <i className="feather-heart" /> Add to Wishlist
                            </a>
                          </div>
                          <div className="col-md-6">
                            <a
                              href="javascript:void(0);"
                              className="btn btn-wish w-100"
                            >
                              <i className="feather-share-2" /> Share
                            </a>
                          </div>
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
                <div className="card include-sec">
                  <div className="card-body">
                    <div className="cat-title">
                      <h4>Includes</h4>
                    </div>
                    <ul>
                      <li>
                        <img
                          src="assets/img/icon/import.svg"
                          className="me-2"
                          alt=""
                        />
                        11 hours on-demand video
                      </li>
                      <li>
                        <img
                          src="assets/img/icon/play.svg"
                          className="me-2"
                          alt=""
                        />
                        69 downloadable resources
                      </li>
                      <li>
                        <img
                          src="assets/img/icon/key.svg"
                          className="me-2"
                          alt=""
                        />
                        Full lifetime access
                      </li>
                      <li>
                        <img
                          src="assets/img/icon/mobile.svg"
                          className="me-2"
                          alt=""
                        />
                        Access on mobile and TV
                      </li>
                      <li>
                        <img
                          src="assets/img/icon/cloud.svg"
                          className="me-2"
                          alt=""
                        />
                        Assignments
                      </li>
                      <li>
                        <img
                          src="assets/img/icon/teacher.svg"
                          className="me-2"
                          alt=""
                        />
                        Certificate of Completion
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card feature-sec">
                  <div className="card-body">
                    <div className="cat-title">
                      <h4>Includes</h4>
                    </div>
                    <ul>
                      <li>
                        <img
                          src="assets/img/icon/timer.svg"
                          className="me-2"
                          alt=""
                        />
                        Thời gian: <span>20 tiếng</span>
                      </li>
                      <li>
                        <img
                          src="assets/img/icon/chapter.svg"
                          className="me-2"
                          alt=""
                        />
                        Chương học: <span>{chapters?.length || 15}</span>
                      </li>
                      <li>
                        <img
                          src="assets/img/icon/video.svg"
                          className="me-2"
                          alt=""
                        />
                        Video:<span> 12 tiếng</span>
                      </li>
                      <li>
                        <img
                          src="assets/img/icon/chart.svg"
                          className="me-2"
                          alt=""
                        />
                        Level: <span>Beginner</span>
                      </li>
                    </ul>
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
