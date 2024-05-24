import React, { Fragment, useEffect, useState } from "react";
import CourseList from "../../../components/CourseList/CourseList";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesAPI } from "../../../redux/reducer/courseSlice";
import { CircularProgress, Grid, Pagination } from "@mui/material";
import useDebounce from "../../../hooks/useDebounce";

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

  // #endregion
  const handlePageChange = (page, value) => {
    dispatch(getAllCoursesAPI({ page: value - 1, size: 6, home: "home" }));
    setPagination(value);
  };
  //#endregion
  useEffect(() => {
    dispatch(getAllCoursesAPI({ page: 0, size: 6, home: "home" }));
  }, []);
  // Tìm kiếm khóa học
  const handleSearch = (searchValue) => {
    setSearchValue(searchValue);
  };
  const fetchCourses = () => {
    try {
      setIsLoadingFetch(true);
      dispatch(getAllCoursesAPI({ page: 0, searchValue, size: 6 }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingFetch(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [debouncedSearchTerm, dispatch]);
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
      <section className="course-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="showing-list">
                <div className="row">
                  {/*<div className="col-lg-6">*/}
                  {/*  <div className="d-flex align-items-center">*/}
                  {/*    <div className="view-icons">*/}
                  {/*      <a href="" className="grid-view">*/}
                  {/*        <i className="feather-grid" />*/}
                  {/*      </a>*/}
                  {/*      <a href="" className="list-view active">*/}
                  {/*        <i className="feather-list" />*/}
                  {/*      </a>*/}
                  {/*    </div>*/}
                  {/*    <div className="show-result">*/}
                  {/*      <h4>Showing 1-9 of 50 results</h4>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  <div className="col-lg-6">
                    <div className="show-filter add-course-info">
                      <form action="#">
                        <div className="row gx-2 align-items-center">
                          <div className="col-md-6 col-item">
                            <div className="search-group">
                              <i className="feather-search" />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm khóa học"
                                onChange={(e) => handleSearch(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6 col-item">
                            <div className="input-block select-form mb-0">
                              <select
                                className="form-select select"
                                name="sellist1"
                              >
                                <option>Newly published</option>
                                <option>published 1</option>
                                <option>published 2</option>
                                <option>published 3</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
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
                    <CircularProgress />
                  </Grid>
                ) : (
                  allCourses?.courses?.map((item, index) => (
                    <Fragment key={index}>
                      <CourseList item={item} isLogin={user} />
                    </Fragment>
                  ))
                )}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Pagination
                    count={allCourses?.totalPages}
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
                    <i className="feather-filter" />
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
                        <i className="fas fa-angle-down" />
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark" /> Backend (3)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark" /> CSS (2)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark" /> Frontend (2)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            name="select_specialist"
                            defaultChecked=""
                          />
                          <span className="checkmark" /> General (2)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            name="select_specialist"
                            defaultChecked=""
                          />
                          <span className="checkmark" /> IT &amp; Software (2)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark" /> Photography (2)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark" /> Programming Language
                          (3)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check mb-0">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark" /> Technology (2)
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
                        <i className="fas fa-angle-down" />
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark" /> Keny White (10)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark" /> Hinata Hyuga (5)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark" /> John Doe (3)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check mb-0">
                          <input
                            type="checkbox"
                            name="select_specialist"
                            defaultChecked=""
                          />
                          <span className="checkmark" /> Nicole Brown
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
                        <i className="fas fa-angle-down" />
                      </div>
                      <div>
                        <label className="custom_check custom_one">
                          <input type="radio" name="select_specialist" />
                          <span className="checkmark" /> All (18)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check custom_one">
                          <input type="radio" name="select_specialist" />
                          <span className="checkmark" /> Free (3)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check custom_one mb-0">
                          <input
                            type="radio"
                            name="select_specialist"
                            defaultChecked=""
                          />
                          <span className="checkmark" /> Paid (15)
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
