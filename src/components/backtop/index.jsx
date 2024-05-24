import "./index.css";

import { useEffect, useState } from "react";

import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";

export default function BackTop() {
  const [show, setShow] = useState(false);

  /**
   * Hàm kiểm tra vị trí cuộn trang của màn hình
   * Auth: NVQUY(27/02/2024)
   */
  const handleScrollPage = () => {
    // Lấy ra vị trí cuộn trang so với đầu màn hình trình duyệt
    const position = window.pageYOffset;
    // Kiểm tra nếu vị trí scroll cách đầu màn hình 250px thì hiển thị button backtop
    if (position >= 250) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    // Lắng nghe sự kiện cuộn màn hình
    window.addEventListener("scroll", handleScrollPage);

    // Hủy lắng nghe sự kiện scroll khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScrollPage);
    };
  });

  // Khi click vào button thì chuyển về đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {show && (
        <>
          <button
            onClick={scrollToTop}
            className="btn-back-top  cursor-pointer z-9 border border-sky-500"
          >
            <KeyboardControlKeyIcon className="arrow" />
          </button>
        </>
      )}
    </>
  );
}
