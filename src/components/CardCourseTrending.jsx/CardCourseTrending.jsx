import React from "react";
import {Link} from "react-router-dom";

export default function CardCourseTrending({item, user}) {
    return (
        <div className="course-box trend-box cursor-pointer">
            <Link to={user ? `/courseDetail/${item.id}` : '/login'}>
                <div className="product trend-product">
                    {/*<div className="product-img">*/}
                    {/*  <Link to={`/courseDetail/${item.id}`}>*/}
                    {/*    <img className="img-fluid" alt="" src={item.image} />*/}
                    {/*  </Link>*/}
                    {/*</div>*/}
                    <div className="product-content">
                        <div className="course-group d-flex">
                            <div className="course-group-img d-flex">
                                <img src={"http://localhost:8080/img/" + item.image} alt=""/>
                                <div className="course-name">
                                    <h4>
                                        {item.title}
                                    </h4>

                                </div>
                            </div>

                        </div>

                        <div className="course-info d-flex align-items-center">
                            <div className="rating-img d-flex align-items-center">
                                <img
                                    src="assets/img/icon/icon-01.svg"
                                    alt=""
                                    className="img-fluid"
                                />
                                <p> {item.totalChapter} Chương</p>
                            </div>
                            <div className="course-view d-flex align-items-center">
                                <img
                                    src="assets/img/icon/users.svg"
                                    alt=""
                                    className="img-fluid"
                                />
                                <p> {item.totalUser} Học viên</p>
                            </div>
                        </div>
                        <div className="rating">
                            <i className="fa-regular fa-heart"/>
                            <span className="d-inline-block average-rating">
              <p> {item.totalFavourite} Lượt thích</p>
            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
