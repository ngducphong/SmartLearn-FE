import React, {useState, useEffect, useRef} from 'react';
import ChatForm from './ChatForm';
import Message from './Message';
import MessageModel from '../models/Message';
import {sendChat} from "../../api/chatAi.js";
import {Divider} from "antd";
import CloseIcon from "@mui/icons-material/Close.js"; // Import mô hình tin nhắn

const ChatApp = ({closeForm}) => {
    const [messages, setMessages] = useState([]);
    const [sendingMessage, setSendingMessage] = useState(false); // State để theo dõi việc gửi tin nhắn
    const messagesEndRef = useRef(null);

    const handleSendMessage = async (newMessageContent) => {
        setSendingMessage(true); // Đánh dấu đang gửi tin nhắn
        try {
            // Gọi API để gửi tin nhắn đi (giả sử sử dụng fetch hoặc axios)
            const response = await sendChat(newMessageContent);

            const sendMessage = new MessageModel(newMessageContent, new Date(), 'sent');
            setMessages(prevMessages => [...prevMessages, sendMessage]);

            const newMessage = new MessageModel(response, new Date(), 'received');
            setMessages(prevMessages => [...prevMessages, newMessage]);


        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
            // Xử lý khi gửi tin nhắn thất bại (nếu cần)
        } finally {
            setSendingMessage(false); // Kết thúc quá trình gửi tin nhắn
        }
    };

    useEffect(() => {
        // Cuộn xuống dòng mới nhất
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-app">
            <div >
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%", /* Đảm bảo phần tử bao phủ toàn bộ chiều rộng của container */
                }}>
                    <h5>Hỏi đáp với AI</h5>
                    <CloseIcon
                        onClick={closeForm}
                        className="cursor-pointer hover:text-gray-500"
                    />
                </div>

                <Divider />
            </div>
            <div className="messages-list">
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <ChatForm onSendMessage={handleSendMessage} sendingMessage={sendingMessage} />
        </div>
    );
};

export default ChatApp;
