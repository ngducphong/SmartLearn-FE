import React, {useEffect, useRef, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {Divider, Button, Input} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {toolbarOptions, formats} from "../../utils/toolbarOptions";

export default function FormAddCategory({closeForm, handleOk, categoryInfo}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef(null);

    const [categoryStatus, setCategoryStatus] = useState(
        categoryInfo?.voided ? "inactive" : "active"
    );

    // Gán giá trị cho các state từ props categoryInfo khi component được render
    useEffect(() => {
        if (categoryInfo) {
            setName(categoryInfo.name);
            setDescription(categoryInfo.description);
        }
    }, [categoryInfo]);

    const onStart = () => {
        setIsLoading(true);
    };

    const onEnd = () => {
        setIsLoading(false);
    };
    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            closeForm(); // Đóng form nếu click bên ngoài form
        }
    };
    const handleAdd = () => {
        onStart();
        handleOk({name, description, }, onEnd);
        resetField();
    };
    const handleEditCategory = () => {
        // Gọi hàm handleEdit và truyền thông tin cập nhật của khóa học
        handleOk({
            id: categoryInfo.id,
            name,
            description,
            voided: categoryStatus === "active" ? false : true,
        });
        resetField();
    };
    const resetField = () => {
        setName("");
        setDescription("");
    };
    return (
        <>
            <div className="overlay" onClick={handleClickOutside}>
                <form
                    ref={formRef}
                    className="fade-down bg-white w-[50%] px-[24px] py-[20px] rounded"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-[20px] font-semibold">Thêm mới danh mục</h3>
                        <CloseIcon
                            onClick={closeForm}
                            className="cursor-pointer hover:text-gray-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-5 mt-3">
                        <div>
                            <label htmlFor="">Tên danh mục</label>
                            <Input
                                className="mt-2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    {categoryInfo && <div>
                        <label htmlFor="">Trạng thái: </label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="active"
                                    checked={categoryStatus === "active"}
                                    onChange={() => setCategoryStatus("active")}
                                />
                                <span className="text-green-600 font-bold"> Đang hoạt động </span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="inactive"
                                    checked={categoryStatus === "inactive"}
                                    onChange={() => setCategoryStatus("inactive")}
                                />
                                <span className="text-red-600 font-bold">Bị khóa</span>
                            </label>
                        </div>
                    </div>}
                    <div className="mt-[20px]">
                        <label htmlFor="">Mô tả</label>
                        <ReactQuill
                            className="mt-2"
                            modules={toolbarOptions}
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            formats={formats}
                        />
                    </div>
                    <Divider/>
                    <div className="flex justify-end gap-2">
                        <Button onClick={closeForm}>Hủy</Button>
                        <Button
                            type="primary"
                            className="bg-blue-600"
                            onClick={categoryInfo ? handleEditCategory : handleAdd}
                            disabled={isLoading}
                        >
                            {isLoading ? <Spin/> : "Lưu"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
