import React, {Fragment, useEffect, useState} from "react";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import {Link} from "react-router-dom";
import {getAllCourses, getMyCourses, recommendCourseByMyCourse} from "../../../api/courseAPIs.js";

export default function TopCategory({user}) {
    const [category, setCategory] = useState([])
    const getListCourses = async () => {
        const data = await getAllCourses( 0, null,  6,  "home" );
        setCategory(data.content);
    }
    const getRecommendCourseByMyCourse = async () => {
        const data = await recommendCourseByMyCourse();
        setCategory(data);
    }
    useEffect(() => {
        getListCourses();
        if (user){
            getRecommendCourseByMyCourse();
        }
    }, []);

    return (
        <section className="section how-it-works">
            <div className="container">
                <div className="section-header aos" data-aos="fade-up">
                    <div className="section-sub-head">
                        <span>Top các khóa học hàng đầu</span>
                        <h2>Khoá học dành cho bạn </h2>
                    </div>
                    <div className="all-btn all-category d-flex align-items-center">
                        <Link to="/courses" className="btn btn-primary">
                            Tất cả các khóa học
                        </Link>
                    </div>
                </div>
                <div
                    className="owl-carousel mentoring-course owl-theme aos"
                    data-aos="fade-up"
                >
                    {category?.map((item, index) => (
                        <Fragment key={index}>
                            <CategoryCard item={item}/>
                        </Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}
