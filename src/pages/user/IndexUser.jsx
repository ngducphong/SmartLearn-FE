import {Outlet} from "react-router-dom";
import Header from "../../layouts/user/Header/Header";
import Footer from "../../layouts/user/Footer/Footer";
import ChatApp from "../../components/chat/ChatApp.jsx";
import React, {useState} from "react";
import {CommentOutlined, OpenAIOutlined} from "@ant-design/icons";
import {Button} from "antd";

function IndexUser() {
    const [showFormChatApp, setShowFormChatApp] = useState(false);

    const closeFormChatApp = () => {
        setShowFormChatApp(false);
    };

    return (
        <div className="main-wrapper">
            <Header/>
            <Button type="primary" shape="circle" className="fixed-button-chat" onClick={() => setShowFormChatApp(true)}>
                <div style={{display:"flex" ,flexDirection: "column", alignItems: "center"}}>

                    <OpenAIOutlined style={{fontSize:"20px"}}/>
                    <span>Hỏi đáp AI</span>
                </div>

            </Button>
            {
                showFormChatApp
                && <ChatApp closeForm={closeFormChatApp}/>}
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default IndexUser;
