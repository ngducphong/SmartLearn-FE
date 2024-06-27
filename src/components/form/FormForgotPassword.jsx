import React, {useEffect, useRef, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {Divider, Button, Input} from "antd";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import {resetPassword} from "../../api/resetPasswordAPIs.js";

export default function FormForgotPassword({closeForm}) {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isPhone, setIsPhone] = useState(true);
    const formRef = useRef(null);

    const handleIsPhone = () => {
        if (isPhone) {
            setIsPhone(false)
        } else {
            setIsPhone(true)
        }
    }
    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            closeForm(); // Đóng form nếu click bên ngoài form
        }
    };
    const handleSave = async (infoUser) => {
        try {
            await resetPassword(infoUser);
        } catch (error) {
            console.log(error);
        }
    };
    const handleAdd = () => {
        handleSave({email, phone,});
        resetField();
    };

    const resetField = () => {
        setPhone("");
        setEmail("");
    };
    return (
        <>
            <div className="overlay" onClick={handleClickOutside}>
                <form
                    ref={formRef}
                    className="fade-down bg-white w-[50%]"
                >
                    <div className="loginbox" style={{padding: "10px 70px 60px 70px"}}>
                        <div className="w-100">
                            <div className="img-logo">
                                <img
                                    src="assets/img/img.png"
                                    className="logo-local"
                                    alt="Logo"
                                />
                                <div className="back-home">
                                    <CloseIcon
                                        onClick={closeForm}
                                        className="cursor-pointer hover:text-gray-500"
                                    />
                                </div>
                            </div>
                            <h1 style={{marginBottom: "5px"}}>Quên mật khẩu?</h1>
                            <p style={{color: "#00000073", marginBottom: "50px"}}>nhập số điện thoại hoặc email của mà
                                bạn đăng ký tài khoản nhé !!!</p>
                            <Button type="link" onClick={handleIsPhone} style={{paddingLeft: "0px"}}>
                                {isPhone ? <span className="text-rikkei">Dùng số điện thoại để gửi mật khẩu mới</span> :
                                    <span className="text-rikkei">Dùng Email để gửi mật khẩu mới</span>}
                            </Button>
                            {!isPhone && <div className="input-block">
                                <label className="form-control-label">Nhập số điện thoại</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập số điện thoại"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>}
                            {isPhone && <div className="input-block">
                                <label className="form-control-label">Nhập email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>}
                            <div className="forgot" style={{display: "inline-block"}}>

                            </div>
                            <div className="d-grid">
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={handleAdd}
                                    style={{background:"#1dbfaf"}}
                                >
                                    Đặt lại mật khẩu
                                </Button>
                            </div>
                        </div>
                    </div>


                </form>
            </div>
        </>
    );
}
