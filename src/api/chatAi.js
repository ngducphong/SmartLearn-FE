import {jsonAxios} from "./api.base.url.js";
import {notify} from "../utils/notification.js";

export const sendChat = async (text) => {

  let request = {
    text:text
  };

  try {
    const response = await jsonAxios.post("api/v1/gemini/chat", request);
    return response.data;
  } catch (error) {
    console.log("Có lỗi khi đổi tin nhắn", error);
    notify("error", "Có lỗi khi gửi tin nhắn");
  }
};