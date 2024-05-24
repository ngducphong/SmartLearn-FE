import React, { memo, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Input, Button, Divider, Select } from "antd";
import { getAllRoles } from "../../api/rolesAPIs";
import { notify } from "../../utils/notification";

function AddUserForm({ closeForm, handleOk, editUser }) {
  const [username, setUsername] = useState(editUser?.username || null);
  const [fullName, setFullName] = useState(editUser?.fullName || null);
  const [phone, setPhone] = useState(editUser?.phone || null);
  const [email, setEmail] = useState(editUser?.email || null);
  const [password, setPassword] = useState(null);
  const [userStatus, setUserStatus] = useState(
    editUser?.voided ? "inactive" : "active"
  );
  const [selectedRoles, setSelectedRoles] = useState(editUser?.role || []);
  const [allRoles, setAllRoles] = useState(null);
  const formRef = useRef(null);
  const getDataRoles = async () => {
    try {
      const allRoles = await getAllRoles();
      setAllRoles(allRoles);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataRoles();
  }, []);
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      closeForm();
    }
  };
  // Lấy giá trị ô checkbox
  const handleCheckboxChange = (roleName) => {
    if (selectedRoles.includes(roleName)) {
      setSelectedRoles(selectedRoles.filter((role) => role !== roleName));
    } else {
      setSelectedRoles([...selectedRoles, roleName]);
    }
  };
  // Hàm thêm người dùng
  const handleAdd = () => {
    if (!username || !phone || !password) {
      return notify("error", "Vui lòng điền đầy đủ thông tin");
    }
    if (selectedRoles.length === 0) {
      return notify("error", "Vui lòng chọn ít nhất 1 quyền");
    }
    // Tiếp tục xử lý gửi dữ liệu khi không có lỗi
    handleOk({
      fullName,
      username,
      email,
      phone,
      password,
      role: selectedRoles,
      type: "add",
    });
  };
  const handleSave = () => {
    if (!username && (!phone || !email)) {
      return notify("error", "Vui lòng điền đầy đủ thông tin");
    }
    if (selectedRoles.length === 0) {
      return notify("error", "Vui lòng chọn ít nhất 1 quyền");
    }
    // Tiếp tục xử lý gửi dữ liệu khi không có lỗi
    handleOk({
      id: editUser?.id,
      fullName,
      username,
      email,
      phone,
      password,
      role: selectedRoles,
      voided: userStatus === "active" ? false : true,
      type: "edit",
    });
  };
  return (
    <>
      {editUser ? (
        <div className="overlay" onClick={handleClickOutside}>
          <form
            ref={formRef}
            className="fade-down bg-white w-[50%] px-[24px] py-[20px] rounded"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-[20px] font-semibold">
                Chỉnh sửa thông tin người dùng
              </h3>
              <CloseIcon
                onClick={closeForm}
                className="cursor-pointer hover:text-gray-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mt-3">
              <div>
                <label htmlFor="">Tên người dùng</label>
                <Input
                  className="mt-2"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Tên tài khoản</label>
                <Input
                    className="mt-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Email</label>
                <Input
                    className="mt-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Số điện thoại</label>
                <Input
                  className="mt-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Mật khẩu</label>
                <Input.Password
                  className="mt-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Trạng thái người dùng</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="active"
                      checked={userStatus === "active"}
                      onChange={() => setUserStatus("active")}
                    />
                    <span className="text-green-600 font-bold">
                      Đang hoạt động
                    </span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="inactive"
                      checked={userStatus === "inactive"}
                      onChange={() => setUserStatus("inactive")}
                    />
                    <span className="text-red-600 font-bold">Bị khóa</span>
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="">Quyền: </label>
                <div className="mt-2">
                  {allRoles?.map((role, index) => (
                    <div key={index}>
                      <label>
                        <input
                          type="checkbox"
                          value={role?.roleName}
                          checked={selectedRoles.includes(role?.roleName)}
                          onChange={() => handleCheckboxChange(role?.roleName)}
                        />
                        {role?.roleName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Divider />
            <div className="flex justify-end gap-2">
              <Button onClick={closeForm}>Hủy</Button>
              <Button
                type="primary"
                className="bg-blue-600"
                onClick={handleSave}
              >
                Lưu
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overlay" onClick={handleClickOutside}>
          <form
            ref={formRef}
            className="fade-down bg-white w-[50%] px-[24px] py-[20px] rounded"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-[20px] font-semibold">Thêm mới người dùng</h3>
              <CloseIcon
                onClick={closeForm}
                className="cursor-pointer hover:text-gray-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mt-3">
              <div>
                <label htmlFor="">Tên người dùng</label>
                <Input
                  className="mt-2"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Tên tài khoản</label>
                <Input
                    className="mt-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Email</label>
                <Input
                    className="mt-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Số điện thoại</label>
                <Input
                  className="mt-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Mật khẩu</label>
                <Input.Password
                  className="mt-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Quyền: </label>
                <div className="mt-2">
                  {allRoles?.map((role, index) => (
                    <div key={index}>
                      <label>
                        <input
                          type="checkbox"
                          value={role.roleName}
                          checked={selectedRoles.includes(role.roleName)}
                          onChange={() => handleCheckboxChange(role.roleName)}
                        />
                        {role.roleName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Divider />
            <div className="flex justify-end gap-2">
              <Button onClick={closeForm}>Hủy</Button>
              <Button
                type="primary"
                className="bg-blue-600"
                onClick={handleAdd}
              >
                Lưu
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export default memo(AddUserForm);
