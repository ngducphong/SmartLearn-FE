import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => {
    const messageClass = message.type === 'sent' ? 'sent-message' : 'received-message';

    return (
        <div className={`message ${messageClass}`}>
            {message.content}
        </div>
    );
};

Message.propTypes = {
    message: PropTypes.object.isRequired,
};

export default Message;
