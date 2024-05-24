import React, {Fragment, useEffect, useState} from "react";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllCourses, getMyCourses} from "../../../api/courseAPIs.js";
import {getAllCoursesAPI} from "../../../redux/reducer/courseSlice.js";

export default function TopCategory() {
    const [category, setCategory] = useState([])
    const getListCourses = async () => {
        const data = await getAllCourses( 0, null,  6,  "home" );
        setCategory(data.content);
    }
    useEffect(() => {
        getListCourses();
    }, []);

    return (
        <section className="section how-it-works">
            <div className="container">
                <div className="section-header aos" data-aos="fade-up">
                    <div className="section-sub-head">
                        <span>Khoá học dành cho bạn</span>
                        <h2>Top các khóa học hàng đầu</h2>
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
                    {category.map((item, index) => (
                        <Fragment key={index}>
                            <CategoryCard item={item}/>
                        </Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}
