import React, {Fragment, useEffect, useState} from "react";
import CourseList from "../../../components/CourseList/CourseList";
import {useDispatch, useSelector} from "react-redux";
import {getAllCoursesAPI} from "../../../redux/reducer/courseSlice";
import {Box, CircularProgress, Grid, Pagination} from "@mui/material";
import useDebounce from "../../../hooks/useDebounce";
import {Tabs, Tab, Typography} from '@mui/material';
import * as PropTypes from "prop-types";
import {getMyCourses} from "../../../api/courseAPIs.js";


function CustomTabPanel(props) {
    const {children, value, index, isLoading, isLoadingFetch, allCourses, myCourses, user, ...other} = props;
    return (<div className="row">
        {isLoading || isLoadingFetch ? (
            <Grid
                item
                xs={12}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "red",
                }}
            >
                <CircularProgress/>
            </Grid>
        ) : (
            allCourses ? (allCourses?.courses?.map((item, index) => (
                <Fragment key={index}>
                    <CourseList item={item} isLogin={user} isMyCourse={false}/>
                </Fragment>
            ))) : (myCourses.content.map((item, index) => (
                <Fragment key={index}>
                    <CourseList item={item} isLogin={user} isMyCourse={true}/>
                </Fragment>)))

        )}
    </div>);
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

CustomTabPanel.propTypes = {
    index: PropTypes.number,
    children: PropTypes.node
};
export default function AllCourses() {
    // #region redux
    const allCourses = useSelector((state) => state.courseSlice);
    const isLoading = useSelector((state) => state.courseSlice.loading);
    const dispatch = useDispatch();
    // #end region
    // #region state
    const [pagination, setPagination] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [isLoadingFetch, setIsLoadingFetch] = useState(false);
    const debouncedSearchTerm = useDebounce(searchValue, 2000);
    const [value, setValue] = useState(0); // Khởi tạo state value với giá trị ban đầu là 0
    const [typeTab, setTypeTab] = useState("ALLCOURSES");

    const [myCourses, setMyCourses] = useState([]);
    const [isLoadMyCourses, setLoadMyCourses] = useState(false);

    const gmyCourses = async (page, searchValue, size) => {
        setLoadMyCourses(true);
        const courses = await getMyCourses(page, searchValue, size);
        setMyCourses(courses);
        setLoadMyCourses(false);
    };
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser || null;
    });
    useEffect(() => {
        const userInfo = localStorage.getItem("user");
        if (userInfo) {
            setUser(userInfo);
        }
    }, []);

    // useEffect(() => {
    //     if (user !== null) {
    //         gmyCourses(0, null, 6)
    //     }
    // }, []);


    // #endregion
    const handlePageChange = (page, value) => {
        if (typeTab === "MYCOURSES") {
            gmyCourses(value - 1, null, 6)
            setPagination(value);
        } else {
            dispatch(getAllCoursesAPI({page: value - 1, size: 6, home: "home"}));
            setPagination(value);
        }
    };
    //#endregion
    useEffect(() => {
        if (value === 1) {
            // Khoá học của tôi
            if (user !== null) {
                gmyCourses(0, null, 6)
            }
            setTypeTab("MYCOURSES")

        } else {
            // tất cả khoá học
            dispatch(getAllCoursesAPI({page: 0, size: 6, home: "home"}));
            setTypeTab("ALLCOURSES")
        }
    }, [value]);

    // Tìm kiếm khóa học
    const handleSearch = (searchValue) => {
        setSearchValue(searchValue);
    };
    const fetchCourses = () => {
        try {
            setIsLoadingFetch(true);
            if (typeTab === "MYCOURSES") {
                gmyCourses(0, searchValue, 6)
            } else {
                dispatch(getAllCoursesAPI({page: 0, searchValue, size: 6}));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingFetch(false);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, [debouncedSearchTerm, dispatch]);
    const handleChange = (event, newValue) => {
        setValue(newValue); // Cập nhật state value khi người dùng chọn một tab khác
    };

    return (
        <div className="mt-[100px] home-slide">
            <div className="breadcrumb-bar" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-12">
                            <div className="breadcrumb-list">
                                <nav aria-label="breadcrumb" className="page-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Trang chủ</a>
                                        </li>
                                        <li
                                            className="breadcrumb-item active cursor-pointer"
                                            aria-current="page"
                                        >
                                            Khóa học
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-9">
                            <div className="showing-list">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="show-filter add-course-info">
                                            <form action="#">
                                                <div className="row gx-2 align-items-center">
                                                    <div className="col-md-6 col-item">
                                                        <div className="search-group">
                                                            <i className="feather-search"/>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Tìm kiếm khóa học"
                                                                onChange={(e) => handleSearch(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*viết vào đây*/}
                            {/*Phan tab*/}

                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Tất cả khoá học" {...a11yProps(0)} />
                                    {user && <Tab label="Khoá học của tôi" {...a11yProps(1)} />}
                                </Tabs>
                            </Box>
                            {
                                typeTab === "ALLCOURSES"
                                    ? (<CustomTabPanel value={value} index={0} isLoading={isLoading}
                                                       isLoadingFetch={isLoadingFetch} allCourses={allCourses}
                                                       user={user}/>)
                                    : (<CustomTabPanel value={value} index={0} isLoading={isLoadMyCourses}
                                                       isLoadingFetch={isLoadingFetch} myCourses={myCourses}
                                                       user={user}/>)
                            }


                            {/*Phan tab*/}

                            <div className="row">
                                <div className="col-md-12">
                                    <Pagination
                                        count={typeTab === "ALLCOURSES" ? allCourses?.totalPages :  myCourses?.totalPages}
                                        page={pagination}
                                        onChange={handlePageChange}
                                        color="primary"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-3 theiaStickySidebar">
                            <div className="filter-clear">
                                <div className="clear-filter d-flex align-items-center">
                                    <h4>
                                        <i className="feather-filter"/>
                                        Filters
                                    </h4>
                                    <div className="clear-text">
                                        <p>CLEAR</p>
                                    </div>
                                </div>
                                <div className="card search-filter categories-filter-blk">
                                    <div className="card-body">
                                        <div className="filter-widget mb-0">
                                            <div className="categories-head d-flex align-items-center">
                                                <h4>Course categories</h4>
                                                <i className="fas fa-angle-down"/>
                                            </div>
                                            <div>
                                                <label className="custom_check">
                                                    <input type="checkbox" name="select_specialist"/>
                                                    <span className="checkmark"/> Backend (3)
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check">
                                                    <input type="checkbox" name="select_specialist"/>
                                                    <span className="checkmark"/> CSS (2)
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check">
                                                    <input type="checkbox" name="select_specialist"/>
                                                    <span className="checkmark"/> Frontend (2)
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check">
                                                    <input
                                                        type="checkbox"
                                                        name="select_specialist"
                                                        defaultChecked=""
                                                    />
                                                    <span className="checkmark"/> General (2)
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check">
                                                    <input
                                                        type="checkbox"
                                                        name="select_specialist"
                                                        defaultChecked=""
                                                    />
                                                    <span className="checkmark"/> IT &amp; Software (2)
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check">
                                                    <input type="checkbox" name="select_specialist"/>
                                                    <span className="checkmark"/> Photography (2)
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check">
                                                    <input type="checkbox" name="select_specialist"/>
                                                    <span className="checkmark"/> Programming Language
                                                    (3)
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check mb-0">
                                                    <input type="checkbox" name="select_specialist"/>
                                                    <span className="checkmark"/> Technology (2)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card search-filter">
                                    <div className="card-body">
                                        <div className="filter-widget mb-0">
                                            <div className="categories-head d-flex align-items-center">
                                                <h4>Instructors</h4>
                                                <i className="fas fa-angle-down"/>
                                            </div>
                                            <div>
                                                <label className="custom_check">
                                                    <input type="checkbox" name="select_specialist"/>
                                                    <span className="checkmark"/> Keny White (10)
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check">
                                                    <input type="checkbox" name="select_specialist"/>
                                                    <span className="checkmark"/> Hinata Hyuga (5)
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check">
                                                    <input type="checkbox" name="select_specialist"/>
                                                    <span className="checkmark"/> John Doe (3)
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check mb-0">
                                                    <input
                                                        type="checkbox"
                                                        name="select_specialist"
                                                        defaultChecked=""
                                                    />
                                                    <span className="checkmark"/> Nicole Brown
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card search-filter">
                                    <div className="card-body">
                                        <div className="filter-widget mb-0">
                                            <div className="categories-head d-flex align-items-center">
                                                <h4>Price</h4>
                                                <i className="fas fa-angle-down"/>
                                            </div>
                                            <div>
                                                <label className="custom_check custom_one">
                                                    <input type="radio" name="select_specialist"/>
                                                    <span className="checkmark"/> All (18)
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check custom_one">
                                                    <input type="radio" name="select_specialist"/>
                                                    <span className="checkmark"/> Free (3)
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check custom_one mb-0">
                                                    <input
                                                        type="radio"
                                                        name="select_specialist"
                                                        defaultChecked=""
                                                    />
                                                    <span className="checkmark"/> Paid (15)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card post-widget">
                                    <div className="card-body">
                                        <div className="latest-head">
                                            <h4 className="card-title">Latest Courses</h4>
                                        </div>
                                        <ul className="latest-posts">
                                            <li>
                                                <div className="post-thumb">
                                                    <a href="">
                                                        <img
                                                            className="img-fluid"
                                                            src="assets/img/blog/blog-01.jpg"
                                                            alt=""
                                                        />
                                                    </a>
                                                </div>
                                                <div className="post-info free-color">
                                                    <h4>
                                                        <a href="">Introduction LearnPress – LMS plugin</a>
                                                    </h4>
                                                    <p>FREE</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="post-thumb">
                                                    <a href="">
                                                        <img
                                                            className="img-fluid"
                                                            src="assets/img/blog/blog-02.jpg"
                                                            alt=""
                                                        />
                                                    </a>
                                                </div>
                                                <div className="post-info">
                                                    <h4>
                                                        <a href="">Become a PHP Master and Make Money</a>
                                                    </h4>
                                                    <p>$200</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="post-thumb">
                                                    <a href="#">
                                                        <img
                                                            className="img-fluid"
                                                            src="assets/img/blog/blog-03.jpg"
                                                            alt=""
                                                        />
                                                    </a>
                                                </div>
                                                <div className="post-info free-color">
                                                    <h4>
                                                        <a href="blog-details.html">
                                                            Learning jQuery Mobile for Beginners
                                                        </a>
                                                    </h4>
                                                    <p>FREE</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="post-thumb">
                                                    <a href="">
                                                        <img
                                                            className="img-fluid"
                                                            src="assets/img/blog/blog-01.jpg"
                                                            alt=""
                                                        />
                                                    </a>
                                                </div>
                                                <div className="post-info">
                                                    <h4>
                                                        <a href=".html">
                                                            Improve Your CSS Workflow with SASS
                                                        </a>
                                                    </h4>
                                                    <p>$200</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="post-thumb">
                                                    <a href="">
                                                        <img
                                                            className="img-fluid"
                                                            src="assets/img/blog/blog-02.jpg"
                                                            alt=""
                                                        />
                                                    </a>
                                                </div>
                                                <div className="post-info free-color">
                                                    <h4>
                                                        <a href="">HTML5/CSS3 Essentials in 4-Hours</a>
                                                    </h4>
                                                    <p>FREE</p>
                                                </div>
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
