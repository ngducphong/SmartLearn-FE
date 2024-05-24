import { Dropdown, Space } from "antd";

import HelpIcon from "@mui/icons-material/Help";
import KeyIcon from "@mui/icons-material/Key";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";
import Tooltip from "@mui/material/Tooltip";
import Cookies from "js-cookie";

export default function Header() {
  const logout = () => {
    // Xóa accessToken từ cookies
    Cookies.remove("accessToken");

    // Xóa dữ liệu người dùng từ localStorage
    localStorage.clear();

    // Chuyển hướng người dùng về  trang chủ
    window.location.href = "/";
  };
  const items = [
    {
      label: (
        <div className="flex items-center gap-2">
          <PersonIcon className="h-4 w-4" />
          <span>Thông tin cá nhân</span>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <KeyIcon />
          <span>Đổi mật khẩu</span>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div className="flex items-center gap-2" onClick={logout}>
          <LogoutIcon />
          <span>Đăng xuất</span>
        </div>
      ),
      key: "3",
    },
  ];
  return (
    <>
      <header className="h-14 sticky top-0 z-40 bg-white w-full px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          {/* <AppsIcon /> */}
          <img className="h-8" src="/images/favicon.ico" alt="" />
          <span className="text-[20px] font-bold text-[#1F1F20]">
            Quản trị viên
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Tooltip title="Thông báo" placement="bottom">
            <NotificationsActiveIcon className="text-[#65696E] cursor-pointer hover:text-[#5d6064]" />
          </Tooltip>
          <Tooltip title="Trợ giúp" placement="bottom">
            <HelpIcon className="text-[#65696E] cursor-pointer hover:text-[#5d6064]" />
          </Tooltip>
          {/* <Brightness2Icon className="text-[#65696E]" cursor-pointer hover:text-[#5d6064]/> */}
          <Tooltip title="Chế độ sáng" placement="bottom">
            <LightModeIcon className="text-[#ffd15c] cursor-pointer hover:text-[#f4cc68]" />
          </Tooltip>

          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full border"
                    src="https://tse1.mm.bing.net/th?id=OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa&pid=Api&P=0&h=180"
                    alt="Ảnh đại diện"
                  />
                  <KeyboardArrowDownIcon className="text-[#65696E] cursor-pointer hover:text-[#5d6064]" />
                </div>
              </Space>
            </a>
          </Dropdown>
        </div>
      </header>
    </>
  );
}
