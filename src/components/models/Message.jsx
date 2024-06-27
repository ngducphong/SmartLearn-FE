// src/models/Message.js

class Message {
    constructor(content, timestamp, type) {
        this.content = content;       // Nội dung tin nhắn
        this.timestamp = timestamp;   // Thời gian gửi
        this.type = type;             // Loại tin nhắn ('sent' hoặc 'received')
    }
}

export default Message;
