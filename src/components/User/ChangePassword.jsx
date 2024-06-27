import React, { useState } from "react";
import { changePassword } from "../../api/userAPIs.js";
import { Button, message } from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, LeftOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [cofNewPassword, setCofNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCofNewPassword, setShowCofNewPassword] = useState(false);
    const [validation, setValidation] = useState({
        oldPassword: true,
        newPassword: true,
        cofNewPassword: true,
    });

    let navigate = useNavigate();

    const handleSave = async (infoUser) => {
        try {
            await changePassword(infoUser);
            message.success("Password changed successfully!");
            resetField();
        } catch (error) {
            if (error.response && error.response.data === "Wrong password") {
                message.error("Current password is incorrect!");
            } else {
                message.error("Error changing password. Please try again.");
            }
            console.log(error);
        }
    };

    const handleAdd = () => {
        const newValidation = {
            oldPassword: !!oldPassword,
            newPassword: !!newPassword,
            cofNewPassword: !!cofNewPassword,
        };
        setValidation(newValidation);

        if (!oldPassword || !newPassword || !cofNewPassword) {
            message.error("All fields are required!");
            return;
        }
        if (newPassword !== cofNewPassword) {
            message.error("New passwords do not match!");
            return;
        }
        handleSave({ oldPassword, newPassword });
    };

    const resetField = () => {
        setOldPassword("");
        setNewPassword("");
        setCofNewPassword("");
        setValidation({
            oldPassword: true,
            newPassword: true,
            cofNewPassword: true,
        });
    };

    const buttonStyle = {
        width: "150px", // Tăng chiều rộng để chứa cả icon và text
        fontSize: "16px",
        backgroundColor: "#1dbfaf",
        color: "#fff",
        borderRadius: "5px",
        padding: "10px 20px",
        margin: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px", // Khoảng cách giữa icon và text
        transition: "background-color 0.3s, transform 0.3s",
    };


    return (
        <div className="px-6 py-3 flex flex-col w-full" style={{ padding: "150px 250px 150px 150px" }}>
            <div className="flex flex-col gap-4 w-full">
                <Button
                    type="link"
                    onClick={() => navigate(-1)}
                    style={buttonStyle}

                >
                    <LeftOutlined />
                    <span>quay về</span>
                </Button>
                <h2>Đổi mậu khẩu</h2>

                <div className="input-block">
                    <label className="form-control-label">Current Password</label>
                    <div className="password-input">
                        <input
                            type={showOldPassword ? "text" : "password"}
                            className={`form-control ${!validation.oldPassword && 'input-error'}`}
                            placeholder="Enter current password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <Button
                            icon={showOldPassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                            onClick={() => setShowOldPassword(!showOldPassword)}
                        />
                    </div>
                </div>
                <div className="input-block">
                    <label className="form-control-label">New Password</label>
                    <div className="password-input">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            className={`form-control ${!validation.newPassword && 'input-error'}`}
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Button
                            icon={showNewPassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        />
                    </div>
                </div>
                <div className="input-block">
                    <label className="form-control-label">Confirm New Password</label>
                    <div className="password-input">
                        <input
                            type={showCofNewPassword ? "text" : "password"}
                            className={`form-control ${!validation.cofNewPassword && 'input-error'}`}
                            placeholder="Confirm new password"
                            value={cofNewPassword}
                            onChange={(e) => setCofNewPassword(e.target.value)}
                        />
                        <Button
                            icon={showCofNewPassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                            onClick={() => setShowCofNewPassword(!showCofNewPassword)}
                        />
                    </div>
                </div>
                <div className="d-grid">
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleAdd}
                        style={{ background: "#1dbfaf", width: "200px" }}
                    >
                        Change Password
                    </Button>

                </div>
            </div>
        </div>
    );
}
