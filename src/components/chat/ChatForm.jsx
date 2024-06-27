import React, { useState } from 'react';

const ChatForm = ({ onSendMessage, sendingMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!sendingMessage && message.trim()) {
            await onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="chat-form">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="chat-input"
                disabled={sendingMessage} // Vô hiệu hóa input khi đang gửi tin nhắn
            />
            <button type="submit" className="send-button" disabled={sendingMessage}>
                {sendingMessage ? 'Đang gửi...' : 'Gửi'}
            </button>
        </form>
    );
};

export default ChatForm;
