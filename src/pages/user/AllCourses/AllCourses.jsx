import React, { Fragment, useEffect, useState } from "react";
import CourseList from "../../../components/CourseList/CourseList";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesAPI } from "../../../redux/reducer/courseSlice";
import { Box, CircularProgress, Grid, Pagination, Tabs, Tab, Typography } from "@mui/material";
import useDebounce from "../../../hooks/useDebounce";
import * as PropTypes from "prop-types";
import { getMyCourses } from "../../../api/courseAPIs.js";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { getAllCategory } from "../../../api/categoryAPIs.js";

function CustomTabPanel({ isLoading, isLoadingFetch, allCourses, myCourses, user, typeTab }) {
    return (
        <div className="row">
            {(isLoading || isLoadingFetch) ? (
                <Grid item xs={12} style={{ display: "flex", justifyContent: "center", color: "red" }}>
                    <CircularProgress />
                </Grid>
            ) : (
                typeTab === "ALLCOURSES" ? (
                    allCourses?.courses?.map((item, index) => (
                        <Fragment key={index}>
                            <CourseList item={item} isLogin={user} isMyCourse={false} />
                        </Fragment>
                    ))
                ) : (
                    myCourses?.content?.map((item, index) => (
                        <Fragment key={index}>
                            <CourseList item={item} isLogin={user} isMyCourse={true} />
                        </Fragment>
                    ))
                )
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    isLoading: PropTypes.bool,
    isLoadingFetch: PropTypes.bool,
    allCourses: PropTypes.object,
    myCourses: PropTypes.object,
    user: PropTypes.string,
    typeTab: PropTypes.string
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function AllCourses() {
    const allCourses = useSelector((state) => state.courseSlice);
    const isLoading = useSelector((state) => state.courseSlice.loading);
    const dispatch = useDispatch();

    const [pagination, setPagination] = useState(1);
    const [searchName, setSearchName] = useState("");
    const [isLoadingFetch, setIsLoadingFetch] = useState(false);
    const debouncedSearchTerm = useDebounce(searchName, 2000);
    const [value, setValue] = useState(0);
    const [typeTab, setTypeTab] = useState("ALLCOURSES");

    const [myCourses, setMyCourses] = useState([]);
    const [isLoadMyCourses, setLoadMyCourses] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState("");

    const getListCategory = async () => {
        const data = await getAllCategory();
        setCategoryList(data);
    };

    useEffect(() => {
        getListCategory();
    }, []);

    const fetchMyCourses = async (page, searchName, size, listCategorieIds, priceRange) => {
        setLoadMyCourses(true);
        const courses = await getMyCourses(page, searchName, size, listCategorieIds, priceRange);
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

    const handlePageChange = (event, value) => {
        if (typeTab === "MYCOURSES") {
            fetchMyCourses(value - 1, null, 6, selectedCategories, selectedPriceRange);
        } else {
            dispatch(getAllCoursesAPI({ page: value - 1, size: 6, home: "home", categories: selectedCategories, searchValue: searchName }));
        }
        setPagination(value);
    };

    useEffect(() => {
        if (value === 1) {
            if (user !== null) {
                fetchMyCourses(0, null, 6, selectedCategories, selectedPriceRange);
            }
            setTypeTab("MYCOURSES");
        } else {
            dispatch(getAllCoursesAPI({ page: 0, size: 6, home: "home", categories: selectedCategories, searchValue: searchName }));
            setTypeTab("ALLCOURSES");
        }
    }, [value, user, dispatch]);

    const handleSearch = (searchName) => {
        setSearchName(searchName);
    };

    const fetchCourses = () => {
        setIsLoadingFetch(true);
        if (typeTab === "MYCOURSES") {
            fetchMyCourses(0, searchName, 6, selectedCategories, selectedPriceRange);
        } else {
            dispatch(getAllCoursesAPI({ page: 0, searchValue: { name: searchName, price: selectedPriceRange }, size: 6, categories: selectedCategories }));
        }
        setIsLoadingFetch(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(categoryId)) {
                return prevSelected.filter(id => id !== categoryId);
            } else {
                return [...prevSelected, categoryId];
            }
        });
    };

    const handlePriceChange = (priceRange) => {
        setSelectedPriceRange(priceRange);
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSearchName("");
        setSelectedPriceRange("");
        fetchCourses();
    };

    return (
        <div className="mt-[100px] home-slide">
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
                                        <li className="breadcrumb-item active cursor-pointer" aria-current="page">
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
                            <div className="showing-list" style={{ marginTop: "30px", width: "900px" }}>
                                <div className="row">
                                    <div className="search-group">
                                        <Input size="large" placeholder="Tìm kiếm khóa học" prefix={<SearchOutlined />} onChange={(e) => handleSearch(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Tất cả khoá học" {...a11yProps(0)} />
                                    {user && <Tab label="Khoá học của tôi" {...a11yProps(1)} />}
                                </Tabs>
                            </Box>
                            <CustomTabPanel
                                isLoading={typeTab === "ALLCOURSES" ? isLoading : isLoadMyCourses}
                                isLoadingFetch={isLoadingFetch}
                                allCourses={allCourses}
                                myCourses={myCourses}
                                user={user}
                                typeTab={typeTab}
                            />
                            <div className="row">
                                <div className="col-md-12">
                                    <Pagination
                                        count={typeTab === "ALLCOURSES" ? allCourses?.totalPages : myCourses?.totalPages}
                                        page={pagination}
                                        onChange={handlePageChange}
                                        color="primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 theiaStickySidebar" style={{marginTop:"105px"}}>
                            <div className="filter-clear">
                                <div className="d-flex align-items-center" style={{ padding: "15px" }}>
                                    <Button type="primary" style={{ width: "150px", marginRight: "20px" }} onClick={fetchCourses}>Lọc</Button>
                                    <Button danger style={{ width: "150px" }} onClick={clearFilters}>Bỏ lọc</Button>
                                </div>
                                <div className="card search-filter categories-filter-blk">
                                    <div className="card-body">
                                        <div className="filter-widget mb-0">
                                            <div className="categories-head d-flex align-items-center">
                                                <h4>Danh mục</h4>
                                            </div>
                                            {categoryList?.map((category, index) => (
                                                <div key={index}>
                                                    <label className="custom_check">
                                                        <input type="checkbox" name="select_specialist" onChange={() => handleCategoryChange(category.id)} checked={selectedCategories.includes(category.id)} />
                                                        <span className="checkmark"/> {category.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="card search-filter">
                                    <div className="card-body">
                                        <div className="filter-widget mb-0">
                                            <div className="categories-head d-flex align-items-center">
                                                <h4>Giá</h4>
                                            </div>
                                            <div>
                                                <label className="custom_check custom_one">
                                                    <input type="radio" name="priceRange" onChange={() => handlePriceChange("0-500000")} checked={selectedPriceRange === "0-500000"} />
                                                    <span className="checkmark"/> 0 - 500,000đ
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check custom_one">
                                                    <input type="radio" name="priceRange" onChange={() => handlePriceChange("500000-1000000")} checked={selectedPriceRange === "500000-1000000"} />
                                                    <span className="checkmark"/> 500,000đ - 1,000,000đ
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check custom_one mb-0">
                                                    <input type="radio" name="priceRange" onChange={() => handlePriceChange("1000000-2000000")} checked={selectedPriceRange === "1000000-2000000"} />
                                                    <span className="checkmark"/> 1,000,000đ - 2,000,000đ
                                                </label>
                                            </div>
                                            <div>
                                                <label className="custom_check custom_one mb-0">
                                                    <input type="radio" name="priceRange" onChange={() => handlePriceChange("2000000-999999999")} checked={selectedPriceRange === "2000000+"} />
                                                    <span className="checkmark"/> Lớn hơn 2,000,000đ
                                                </label>
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
