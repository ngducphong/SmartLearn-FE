import React from "react";
import {Link} from "react-router-dom";

export default function CourseCard({item, user}) {
    const formattedPrice = (price) => Number(price).toLocaleString('vi-VN');
    return (

            <div className="col-lg-4 col-md-6 d-flex"><Link to={user ? `/courseDetail/${item.id}` : '/login'}>
                <div className="course-box d-flex aos" data-aos="fade-up">
                    <div className="product">
                        <div className="product-img">
                            <div>
                                <h4>
                                    <p className="priceplu">{item.price ? formattedPrice(item.price) + " đ" : "Miễn phí"} </p>
                                </h4>
                            </div>
                        </div>
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
                                <div className="course-share d-flex align-items-center justify-content-center">
                                </div>
                            </div>

                            <div className="course-info d-flex align-items-center">
                                <div className="rating-img d-flex align-items-center">
                                    <img src="assets/img/icon/icon-01.svg" alt=""/>
                                    <p>{item.totalChapter} Chương</p>
                                </div>
                                <div className="course-view d-flex align-items-center">
                                    <img src="assets/img/icon/users.svg" alt=""/>
                                    <p>{item.totalUser} Học viên</p>
                                </div>
                            </div>

                        </div>
                        <div className="all-btn all-category d-flex align-items-center">
                            <a href="checkout.html" className="btn btn-primary">
                                MUA NGAY
                            </a>
                        </div>
                    </div>
                </div>
            </Link>
            </div>

    );
}
