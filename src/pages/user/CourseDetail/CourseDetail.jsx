import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CircularProgress,
    Divider,
    Grid,
} from "@mui/material";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getChaptersThunk} from "../../../redux/reducer/chapterSlice";
import {getLessonsThunk} from "../../../redux/reducer/lessonSlice";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {
    checkRegisterCourse,
    getFullCourse,
    getOneCourses,
    recommendCourseByMyCourse,
    recommendCourseDtoById
} from "../../../api/courseAPIs";
import {notify} from "../../../utils/notification";
import Cookies from "js-cookie";
import CategoryCard from "../../../components/CategoryCard/CategoryCard.jsx";

export default function CourseDetail() {
    const chapters = useSelector((state) => state.chapterSlice.chapters);
    const lesson = useSelector((state) => state.lessonSlice.lesson);
    const isLoading = useSelector((state) => state.chapterSlice.loading);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [isRegisterCourse, setIsRegisterCourse] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [category, setCategory] = useState([])
    const {id} = useParams();
    const handleGetDataCourse = async () => {
        const courseInfo = await getFullCourse(id);
        setCurrentCourse(courseInfo);
    };
    const handleCheckRegisterCourse = async () => {
        const isRegister = await checkRegisterCourse(id);
        setIsRegisterCourse(isRegister);
    };
    useEffect(() => {
        handleCheckRegisterCourse();
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
    const learningCourse = async () => {
        const getAuthToken = () => Cookies.get("accessToken");
        if (!getAuthToken()) {
            return notify("error", "Đăng nhập để học ngay !");
            // navigate("/login");
        }
        const isRegister = await checkRegisterCourse(id);
        if (isRegister) {
            navigate(`/course/learn/${id}`);
        } else {
            navigate(`/payMentCourse/${id}`);
        }
    };
    const getRecommendCourseDtoById = async () => {
        const data = await recommendCourseDtoById(id);
        setCategory(data);
    }
    useEffect(() => {
        getRecommendCourseDtoById();
    }, []);
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
                                    <img src="assets/img/icon/icon-01.svg" alt=""/>
                                    <p>{currentCourse?.totalChapter} chương học</p>
                                </div>
                                <div className="cou-info">
                                    <img src="assets/img/icon/timer-icon.svg" alt=""/>
                                    <p>{currentCourse?.totalLesson} bài học</p>
                                </div>
                                <div className="cou-info">
                                    <img src="assets/img/icon/people.svg" alt=""/>
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
                                            <h5 className="subs-title">Các khoá học tương tự</h5>
                                        </div>
                                        <div
                                            className="owl-carousel mentoring-course owl-theme aos"
                                            data-aos="fade-up"
                                            style={{margin:"0px"}}
                                        >
                                        {category?.map((item, index) => (
                                            <Fragment key={index}>
                                                <CategoryCard item={item}/>
                                            </Fragment>
                                        ))}
                                        </div>
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
                                                            <img src={currentCourse?.image} alt=""/>
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
