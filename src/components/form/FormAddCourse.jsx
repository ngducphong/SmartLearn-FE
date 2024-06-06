import React, {useEffect, useRef, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {Divider, Button, Input, Select, Dropdown, Space, Spin} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {toolbarOptions, formats} from "../../utils/toolbarOptions";
import {getAllCategory} from "../../api/categoryAPIs.js";

export default function FormAddCourse({closeForm, handleOk}) {
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDiscription] = useState("");
    const [price, setPrice] = useState();
    const [imageFile, setImageFile] = useState();
    const [subDescription, setSubDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef(null);
    const [categoryShow, setCategoryShow] = useState("");
    const [categoryId, setCategoryId] = useState();
    const [categoryList, setCategoryList] = useState();

    const getListCategory = async () => {
        const data = await getAllCategory();
        setCategoryList(data);

    }
    useEffect(() => {
        getListCategory();
    }, []);

    const onStart = () => {
        setIsLoading(true);
    };

    const onEnd = () => {
        setIsLoading(false);
    };
    const handleClickOutside = (event) => {
        // if (formRef.current && !formRef.current.contains(event.target)) {
        //     closeForm(); // Đóng form nếu click bên ngoài form
        // }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        if (file) {
            setImageFile(file);
            reader.readAsDataURL(file);
            console.log(file)
        }
    };
    const handleAdd = () => {
        onStart();
        handleOk({categoryId, title, description, imageFile, subDescription, price}, onEnd);
        resetField();
    };
    const resetField = () => {
        setTitle("");
        setDiscription("");
        setImageFile("");
        setImageUrl("");
        setPrice("")
    };
    const handleSetCategory = (name, id) => {
        setCategoryShow(name);
        setCategoryId(id);
    }
    const items = categoryList?.map(
        item => (
            {
                key: item.id,
                label: (
                    <p target="_blank" rel="noopener noreferrer" onClick={() => {handleSetCategory(item.name, item.id)}}>
                        {item.name}
                    </p>
                ),
            }
        )
    )

    return (
        <>
            <div className="overlay" onClick={handleClickOutside}>
                <form
                    ref={formRef}
                    className="fade-down bg-white w-[50%] px-[24px] py-[20px] rounded"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-[20px] font-semibold">Thêm mới khóa học</h3>
                        <CloseIcon
                            onClick={closeForm}
                            className="cursor-pointer hover:text-gray-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-5 mt-3">
                        <div>
                            <label style={{display: 'block', marginBottom: '8px'}} htmlFor="">
                                Chọn danh mục
                            </label>

                            <Space direction="vertical">
                                <Space wrap>
                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                        placement="bottomLeft"
                                        arrow
                                    >
                                        <Button style={{width: '15rem'}}>
                                            {categoryShow === "" ? ("Chọn danh mục") : categoryShow}
                                        </Button>
                                    </Dropdown>
                                </Space>
                            </Space>
                        </div>
                        <div>
                            <label htmlFor="">Tên khoá học</label>
                            <Input
                                className="mt-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                        </div>

                        <div>
                            <label htmlFor="">Giá khoá học</label>
                            <Input
                                className="mt-2"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Mô tả tổng quát:</label>
                            <Input
                                className="mt-2"
                                value={subDescription}
                                onChange={(e) => setSubDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="courseImage">
                                Chọn ảnh: <UploadFileIcon/>
                            </label>
                            <input
                                type="file"
                                id="courseImage"
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{display: "none"}}
                            />
                            {imageUrl && (
                                <div>
                                    <img
                                        src={imageUrl}
                                        style={{
                                            width: "200px",
                                            height: "100px",
                                            marginTop: "10px",
                                            overflow: "hidden",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                            )}{" "}
                        </div>
                    </div>
                    <div className="mt-[20px]">
                        <label htmlFor="">Mô tả</label>
                        <ReactQuill
                            className="mt-2"
                            modules={toolbarOptions}
                            theme="snow"
                            value={description}
                            onChange={setDiscription}
                            formats={formats}
                        />
                    </div>
                    <Divider/>
                    <div className="flex justify-end gap-2">
                        <Button onClick={closeForm}>Hủy</Button>
                        <Button
                            type="primary"
                            className="bg-blue-600"
                            onClick={handleAdd}
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
