import { notify } from "../utils/notification";
import { jsonAxios} from "./api.base.url";


export const payment = async (courseId) => {
  let paymentDto = {
    courseDto: {
      id: courseId,
    },
  };
  try {
    const response = await jsonAxios.post("api/payment/create-payment", paymentDto);
    notify("success", "Lấy thông tin thanh toán");
    return response.data;
  } catch (error) {
    console.log("Có lỗi khi lấy thông tin thanh toán", error);
    notify("error", "Có lỗi khi lấy thông tin thanh toán");
  }
};

