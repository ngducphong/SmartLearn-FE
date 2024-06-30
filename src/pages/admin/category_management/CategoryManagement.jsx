import React, { useEffect, useState } from "react";
import MyModal from "../../../components/modal/Modal.jsx";
import FormAddCategory from "../../../components/form/FormAddCategory.jsx";
import { Button, Input, Select, DatePicker, Form, Table } from "antd";
import { CircularProgress, Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { addNewCategory, editCategory, getPageCategory } from "../../../api/categoryAPIs.js";
import { CloseOutlined } from "@ant-design/icons";
// import moment from 'moment'; // Import moment để sử dụng cho DatePicker

export default function CategoryManagement() {
    //#region State
    const [showForm, setShowForm] = useState(false);
    const [flag, setFlag] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [pagination, setPagination] = useState(1);
    const [editCategoryInfo, setEditCategoryInfo] = useState(null);
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [searchTerms, setSearchTerms] = useState({
        name: "",
        createDate: null,
        voided: ""
    });
    const [isLoadingFetch, setIsLoadingFetch] = useState(false);
    //#endregion

    const [listCategory, setListCategory] = useState([]);
    const [categoryPage, setCategoryPage] = useState();
    const [isLoadingListCategory, setIsLoadingListCategory] = useState(false);
    const [removeFilter, setRemoveFilter] = useState(false);

    const getListCategory = async (page, searchTerms, size) => {
        setIsLoadingListCategory(true);
        const data = await getPageCategory(page, searchTerms, size);
        setCategoryPage(data.totalPages);
        setListCategory(data.content);
        setIsLoadingListCategory(false);
    };

    const calculateIndex = (index) => index + 1;

    const handlePageChange = (event, value) => {
        getListCategory(value - 1, searchTerms, 2);
        setPagination(value);
    };

    const dataSource = listCategory?.map((category) => ({
        ...category,
        key: category.id,
    }));

    const columns = [
        {
            title: "STT",
            dataIndex: "",
            align: "center",
            render: (_, __, index) => calculateIndex(index),
        },
        {
            title: "Tên danh mục",
            dataIndex: "name",
            align: "center",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Ngày tạo",
            dataIndex: "createDate",
            align: "center",
            render: (createDate) => {
                const date = new Date(createDate);
                const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                return <p>{formattedDate}</p>;
            },
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            align: "center",
            render: (_, item) => (
                <button onClick={() => handleShowModal(item.description)}>
                    <span className="font-bold">[...]</span>
                </button>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "voided",
            align: "center",
            render: (text) => (
                <p>
                    {text ? (
                        <span className="text-red-500 font-bold">Bị Khóa</span>
                    ) : (
                        <span className="text-green-500 font-bold">Đang hoạt động</span>
                    )}
                </p>
            ),
        },
        {
            title: "Chức năng",
            align: "center",
            render: (item) => (
                <div className="flex justify-evenly">
                    <Button onClick={() => handleEditCategory(item)}>Chỉnh sửa</Button>
                </div>
            ),
        },
    ];

    const openForm = () => {
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const openFormEdit = () => {
        setShowFormEdit(true);
    };

    const closeFormEdit = () => {
        setShowFormEdit(false);
    };

    const handleShowModal = (description) => {
        setSelectedCourse(description);
        setIsModalVisible(true);
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
    };

    const handleAddNewCategory = async (newCategory, onEnd) => {
        try {
            await addNewCategory(newCategory);
            setFlag(!flag);
            closeForm();
            getListCategory(0, searchTerms, 2);
        } catch (error) {
            console.log(error);
        } finally {
            if (onEnd) onEnd();
        }
    };

    const handleSearch = () => {
        setRemoveFilter(true);
        getListCategory(0, searchTerms, 2);
    };

    const handleRemoveFilter = () => {
        setRemoveFilter(false);
        setSearchTerms({
            name: "",
            createDate: null,
            voided: ""
        });
        getListCategory(0, {
            name: "",
            createDate: null,
            voided: ""
        }, 2);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchTerms((prevTerms) => ({
            ...prevTerms,
            [name]: value,
        }));
    };

    const handleDateChange = (date, dateString) => {
        setSearchTerms((prevTerms) => ({
            ...prevTerms,
            createDate: dateString,
        }));
    };

    const handleStatusChange = (value) => {
        setSearchTerms((prevTerms) => ({
            ...prevTerms,
            voided: value,
        }));
    };

    useEffect(() => {
        getListCategory(0, {}, 2);
    }, []);

    const handleEditCategory = (categoryItem) => {
        setEditCategoryInfo(categoryItem);
        openFormEdit();
    };

    const handleSave = async (categoryEdit) => {
        try {
            await editCategory(categoryEdit);
            setPagination(1);
            setFlag(!flag);
            closeFormEdit();
            getListCategory(0, searchTerms, 2);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="px-6 py-3 flex flex-col w-full">
            <MyModal
                isOpen={isModalVisible}
                onOk={handleCancelModal}
                onCancel={handleCancelModal}
                description={selectedCourse}
            />
            {showForm && (
                <FormAddCategory closeForm={closeForm} handleOk={handleAddNewCategory}/>
            )}
            {showFormEdit && (
                <FormAddCategory
                    closeForm={closeFormEdit}
                    handleOk={handleSave}
                    categoryInfo={editCategoryInfo}
                />
            )}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <Form
                        className="fade-down bg-white w-[75%] px-[24px] py-[20px] rounded"
                        style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                        }}
                        layout="vertical"
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Form.Item label="Tên danh mục" name="name">
                                    <Input
                                        name="name"
                                        value={searchTerms.name}
                                        placeholder="Tìm kiếm theo tên danh mục"
                                        onChange={handleInputChange}
                                    />
                                </Form.Item>
                                <Form.Item label="Ngày tạo" name="createDate">
                                    <DatePicker
                                        placeholder="Tìm kiếm theo ngày tạo"
                                        // value={searchTerms.createDate ? moment(searchTerms.createDate) : null}
                                        onChange={handleDateChange}
                                    />
                                </Form.Item>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Form.Item label="Trạng thái" name="voided">
                                    <Select
                                        placeholder="Tìm kiếm theo trạng thái"
                                        value={searchTerms.voided}
                                        options={[
                                            { value: true, label: "Bị Khóa" },
                                            { value: false, label: "Đang hoạt động" }
                                        ]}
                                        onChange={handleStatusChange}
                                    />
                                </Form.Item>
                            </Grid>
                        </Grid>
                        <div>
                            <Button type="primary" onClick={handleSearch}>
                                Tìm kiếm
                            </Button>
                            {removeFilter && (
                                <Button type="dashed" onClick={handleRemoveFilter} style={{ marginLeft: "20px" }}>
                                    <CloseOutlined /> Bỏ lọc
                                </Button>
                            )}
                        </div>
                    </Form>
                    <Button onClick={openForm} type="primary" className="bg-blue-600">
                        Thêm danh mục
                    </Button>
                </div>
                <div className="table-container relative">
                    <div className="mb-8">
                        {isLoadingListCategory || isLoadingFetch ? (
                            <Grid
                                item
                                xs={12}
                                style={{ display: "flex", justifyContent: "center" }}
                            >
                                <CircularProgress /> <h5>Không có dữ liệu</h5>
                            </Grid>
                        ) : (
                            <Table
                                columns={columns}
                                dataSource={dataSource}
                                pagination={false}
                            />
                        )}
                    </div>
                    <div className="flex justify-center">
                        <Pagination
                            count={categoryPage}
                            page={pagination}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
