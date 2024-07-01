import React, {useState, useEffect, memo, useRef} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {Divider, Button, Input, Space, Dropdown} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {toolbarOptions, formats} from "../../utils/toolbarOptions";
import {getAllCategory, getCategoryByCourseId} from "../../api/categoryAPIs.js";

function FormEditCourse({closeFormEdit, handleSave, courseInfo}) {
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState();
    const [price, setPrice] = useState("");
    const [subDescription, setSubDescription] = useState("");
    const formRef = useRef(null);
    const [courseStatus, setCourseStatus] = useState(
        courseInfo?.voided ? "inactive" : "active"
    );
    const [categoryShow, setCategoryShow] = useState("");
    const [categoryId, setCategoryId] = useState();
    const [categoryList, setCategoryList] = useState([]);

    const getListCategory = async () => {
        const data = await getAllCategory();
        setCategoryList(data);
    };

    const getCategoryByCourse = async (id) => {
        const data = await getCategoryByCourseId(id);
        setCategoryShow(data.name);
        setCategoryId(data.id);
    };

    useEffect(() => {
        getListCategory();
        getCategoryByCourse(courseInfo.id);
    }, []);

    useEffect(() => {
        if (courseInfo) {
            setTitle(courseInfo.title);
            setDescription(courseInfo.description);
            setImageUrl("http://localhost:8080/img/" + courseInfo.image);
            setSubDescription(courseInfo.subDescription);
            setPrice(courseInfo.price);
        }
    }, [courseInfo]);

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            closeFormEdit();
        }
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
        }
    };

    const handleEditCourse = () => {
        handleSave({
            id: courseInfo.id,
            title,
            description,
            imageFile: imageFile ? imageFile : null,
            subDescription,
            price,
            voided: courseStatus === "active" ? false : true,
            categoryId,
        });
        resetField();
    };

    const resetField = () => {
        setTitle("");
        setDescription("");
        setImageUrl("");
        setPrice("");
    };

    const handleSetCategory = (name, id) => {
        setCategoryShow(name);
        setCategoryId(id);
    };

    const items = categoryList?.map((item) => ({
        key: item.id,
        label: (
            <p
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSetCategory(item.name, item.id)}
            >
                {item.name}
            </p>
        ),
    }));

    return (
        <>
            <div className="overlay" onClick={handleClickOutside}>
                <form
                    ref={formRef}
                    className="fade-down bg-white w-[50%] px-[24px] py-[20px] rounded"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-[20px] font-semibold">Sửa khóa học</h3>
                        <CloseIcon
                            onClick={closeFormEdit}
                            className="cursor-pointer hover:text-gray-500"
                        />
                    </div>

                    <div>
                        <label style={{display: 'block', marginBottom: '8px'}} htmlFor="">
                            Chọn danh mục
                        </label>
                        <Space direction="vertical">
                            <Space wrap>
                                <Dropdown
                                    menu={{items}}
                                    placement="bottomLeft"
                                    arrow
                                >
                                    <Button style={{width: '15rem'}}>
                                        {categoryShow === "" ? "Chọn danh mục" : categoryShow}
                                    </Button>
                                </Dropdown>
                            </Space>
                        </Space>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                            <label htmlFor="">Tên khóa học</label>
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
                            )}
                        </div>
                        <div>
                            <label htmlFor="">Trạng thái: </label>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="active"
                                        checked={courseStatus === "active"}
                                        onChange={() => setCourseStatus("active")}
                                    />
                                    <span className="text-green-600 font-bold">Đang hoạt động </span>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="inactive"
                                        checked={courseStatus === "inactive"}
                                        onChange={() => setCourseStatus("inactive")}
                                    />
                                    <span className="text-red-600 font-bold">Bị khóa</span>
                                </label>
                            </div>
                        </div>
                    </div>
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
                        <Button onClick={closeFormEdit}>Hủy</Button>
                        <Button
                            type="primary"
                            className="bg-blue-600"
                            onClick={handleEditCourse}
                        >
                            Lưu
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default FormEditCourse;
