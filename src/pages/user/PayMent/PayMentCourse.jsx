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
import {getOneCourses} from "../../../api/courseAPIs";
import {notify} from "../../../utils/notification";
import Cookies from "js-cookie";

export default function PayMentCourse() {
    const chapters = useSelector((state) => state.chapterSlice.chapters);
    const lesson = useSelector((state) => state.lessonSlice.lesson);
    const isLoading = useSelector((state) => state.chapterSlice.loading);
    const [currentCourse, setCurrentCourse] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
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

                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar-sec">
                                <div className="video-sec vid-bg">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="video-details">
                                                <div className="course-fee">
                                                    <img src={currentCourse?.image} alt=""/>
                                                    <h2>FREE</h2>
                                                </div>
                                                <div className="row gx-2">
                                                    <div className="col-md-6">
                                                        <a
                                                            href="course-wishlist.html"
                                                            className="btn btn-wish w-100"
                                                        >
                                                            <i className="feather-heart"/> Add to Wishlist
                                                        </a>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="btn btn-wish w-100"
                                                        >
                                                            <i className="feather-share-2"/> Share
                                                        </a>
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
