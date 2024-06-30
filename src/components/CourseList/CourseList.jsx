import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {favouriteCourse} from "../../api/courseAPIs.js";

export default function CourseList({item, isLogin, isMyCourse}) {
    const formattedPrice = (price) => Number(price).toLocaleString('vi-VN');
    const [isLike, setIsLike] = useState(false);
    const handleFavourite =  async (id) => {
        await favouriteCourse(id);
        setIsLike(true);
    }
    return (
        <div className="col-lg-12 col-md-12 d-flex">
            <div className="course-box course-design list-course d-flex">
                <div className="product">
                    <div className="product-img">
                        <img className="img-fluid" alt="" src={"http://localhost:8080/img/" + item.image}/>
                    </div>
                    <div className="product-content">
                        <div className="head-course-title">
                            <h4 className="title">
                                <a>{item.title}</a>
                            </h4>
                            <div className="all-btn all-category d-flex align-items-center">
                                {
                                    isMyCourse === true ? (
                                        <Link
                                            to={`/courseDetail/${item.id}`}
                                            className="btn btn-primary"
                                        >
                                            HỌC NGAY
                                        </Link>
                                    ) : (
                                        (item.isRegister !== null && item.isRegister === true) ?
                                            (<Link
                                                to={`/courseDetail/${item.id}`}
                                                className="btn btn-primary"
                                            >
                                                HỌC NGAY
                                            </Link>)
                                            :
                                            (
                                                // đoạn này chuyển đến trang thanh toán
                                                <Link
                                                    to={isLogin ? `/payMentCourse/${item.id}` : '/login'}
                                                    className="btn btn-primary"
                                                >
                                                    MUA NGAY
                                                </Link>
                                            )
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <h3 className="title">
                                {item.subDescription}
                            </h3>
                            { isMyCourse === false && (item.isRegister === null || item.isRegister === false) && <p className="">Giá
                                tiền: {item.price ? formattedPrice(item.price) + 'đ' : "Miễn phí"} </p>}
                        </div>
                        <div>
                            <div dangerouslySetInnerHTML={{__html: item.description}}/>
                        </div>

                        {isMyCourse === true && <div className="course-group d-flex mb-0">
                            <div className="course-share d-flex align-items-center justify-content-center">
                                <Button icon={
                                    (item.isFavourite || isLike) ?  <HeartFilled className={"text-rose-500"}/>: <HeartOutlined />
                                }
                                        onClick={() => {handleFavourite(item.id) }}/>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
