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
import {Button, Card, Statistic} from "antd";
import {payment} from "../../../api/paymentAPIs.js";


export default function PayMentCourse() {
    const [currentCourse, setCurrentCourse] = useState(null);
    const dispatch = useDispatch();
    const {id} = useParams();
    const handleGetDataCourse = async () => {
        const courseInfo = await getOneCourses(id);
        setCurrentCourse(courseInfo);
    };
    const navigate = useNavigate();
    useEffect(() => {
        handleGetDataCourse();
        dispatch(getChaptersThunk(id));
        dispatch(getLessonsThunk());
    }, [dispatch, id]);

    const handlePayMent = async () => {
        const getPayment = await payment(id);
        if (!getPayment?.url) {
            console.log("heheh")
            navigate('/courses');
        } else {
            console.log("hihihi")
            window.location.href = getPayment?.url;
        }
    }

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    });
    return (
        <div className="mt-[100px]">
            <section className="page-content course-sec">

                <div className="container">
                    <div style={{display: "flex"}}>
                        <div style={{flex: 1}}>
                            <h1 style={{textAlign: "center"}}>Mua khoá học: {currentCourse?.title}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12" style={{padding: "0 150px 0px 150px"}}>
                            <div className="card overview-sec">
                                <div className="card-body">
                                    <h5 className="subs-title">Tổng quan: </h5>
                                    <div className="row">
                                        <div className="col-md-9">
                                            <h6 style={{color: "rgb(57, 44, 125)"}}>{currentCourse?.subDescription}</h6>

                                        </div>
                                        <div className="col-md-3">
                                            <img src={"http://localhost:8080/img/" + currentCourse?.image} alt=""/>
                                        </div>
                                    </div>

                                    <br/>

                                    <h6>Mô tả khóa học</h6>
                                    <div
                                        className="ckEditor"
                                        dangerouslySetInnerHTML={{
                                            __html: currentCourse?.description,
                                        }}
                                    />

                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <div style={{
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Card style={{background: "rgb(250, 250, 250)", width: "70%"}}
                                                  bordered={false}>
                                                {/* eslint-disable-next-line react/jsx-no-undef */}
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                    <h5>
                                                        Tổng tiền:
                                                    </h5>
                                                    <div style={{marginLeft: "5px"}}>
                                                        <Statistic
                                                            style={{marginBottom: "8px"}}
                                                            value={formatter.format(currentCourse?.price)}
                                                            valueStyle={{color: 'cyan'}}
                                                        />
                                                    </div>

                                                </div>
                                                <div>
                                                    {/* eslint-disable-next-line react/jsx-no-undef */}
                                                    <Button type="primary" style={{width: "100%"}}
                                                            onClick={handlePayMent}>
                                                        <h5 style={{color: "white"}}>Thanh toán</h5>
                                                    </Button>
                                                </div>

                                            </Card>

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
