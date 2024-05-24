import { notification } from "antd";

export const notify = (type, message) => {
  switch (type) {
    case "success":
      return notification.success({
        message: message,
        duration: 2,
      });
    case "error":
      return notification.error({
        message: message,
        duration: 2,
      });
    default:
      return alert(message);
  }
};
