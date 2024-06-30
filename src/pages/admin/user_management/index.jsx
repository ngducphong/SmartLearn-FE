import { Button, Input, Select, DatePicker, Form } from "antd";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk } from "../../../redux/reducer/userSlice";
import FormUser from "../../../components/form/FormUser";
import { createUser, editUserApi } from "../../../api/userAPIs";
import { CircularProgress, Grid } from "@mui/material";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

export default function UserManagement() {
    const allUsers = useSelector((state) => state.userSlice.users);
    const isLoadingThunk = useSelector((state) => state.userSlice.loading);
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [editUser, setEditUser] = useState(null);
    const [flag, setFlag] = useState(false);
    const [removeFilter, setRemoveFilter] = useState(false);
    const [searchTerms, setSearchTerms] = useState({
        username: "",
        fullName: "",
        phone: "",
        email: "",
        createDate: null,
        role: "",
        voided: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = allUsers.slice(indexOfFirstItem, indexOfLastItem);
    const calculateIndex = (index) => index + 1;

    const openForm = () => {
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditUser(null);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const roles = [
        { value: "0", label: "Quản trị viên" },
        { value: "1", label: "Hệ thống" },
        { value: "2", label: "Học viên" }
    ];

    const statuses = [
        { value: true, label: "Bị Khóa" },
        { value: false, label: "Đang hoạt động" }
    ];

    const columns = [
        {
            title: "STT",
            dataIndex: "",
            align: "center",
            render: (_, __, index) => calculateIndex(index),
        },
        {
            title: "Tên tài khoản",
            dataIndex: "username",
            align: "center",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Tên người dùng",
            dataIndex: "fullName",
            align: "center",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            align: "center",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Email",
            dataIndex: "email",
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
            title: "Quyền",
            dataIndex: "role",
            align: "center",
            render: (roles) => (
                <div>
                    {roles.map((role, index) => (
                        <p key={index}>
                            {role === "ROLE_ADMIN" ? "Quản trị viên" :
                                role === "ROLE_SUBADMIN" ? "Hệ thống" :
                                    role === "ROLE_USER" ? "Học viên" : ""}
                        </p>
                    ))}
                </div>
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
            render: (item) => {
                return (
                    <div className="flex justify-evenly ">
                        <Button
                            onClick={() => {
                                setEditUser(item);
                                openForm();
                            }}
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(getUsersThunk());
    }, [flag, dispatch]);

    useEffect(() => {
        fetchUsers(searchTerms);
    }, []);

    const handleSave = async (userData) => {
        if (userData.type === "add") {
            await createUser(userData);
            setFlag(!flag);
            closeForm();
        } else {
            await editUserApi(userData);
            setFlag(!flag);
            closeForm();
        }
        fetchUsers(searchTerms);
    };

    const handleSearch = () => {
        setRemoveFilter(true);
        fetchUsers(searchTerms);
    };

    const handleRemoveFilter = () => {
        setRemoveFilter(false);
        setSearchTerms({
            username: "",
            fullName: "",
            phone: "",
            email: "",
            createDate: null,
            role: "",
            voided: ""
        });
        fetchUsers({
            username: "",
            fullName: "",
            phone: "",
            email: "",
            createDate: null,
            role: "",
            voided: ""
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchTerms((prevTerms) => ({
            ...prevTerms,
            [name]: value
        }));
    };

    const handleDateChange = (date, dateString) => {
        setSearchTerms((prevTerms) => ({
            ...prevTerms,
            createDate: dateString
        }));
    };

    const handleRoleChange = (value) => {
        setSearchTerms((prevTerms) => ({
            ...prevTerms,
            role: value
        }));
    };

    const handleStatusChange = (value) => {
        setSearchTerms((prevTerms) => ({
            ...prevTerms,
            voided: value
        }));
    };

    const fetchUsers = (searchTerms) => {
        setIsLoading(true);
        try {
            dispatch(getUsersThunk({ searchTerms: searchTerms }));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {showForm && (
                <FormUser
                    closeForm={closeForm}
                    handleOk={handleSave}
                    editUser={editUser}
                />
            )}
            <div className="px-6 py-3 flex flex-col  w-full">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex items-center justify-between">
                        <Form
                            className="fade-down bg-white w-[85%] px-[24px] py-[20px] rounded"
                            style={{
                                border: "1px solid #ccc",
                                padding: "20px",
                            }}
                            layout="vertical"
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Form.Item label="Tên tài khoản" name="username">
                                        <Input
                                            name="username"
                                            value={searchTerms.username}
                                            placeholder="Tìm kiếm theo tên tài khoản"
                                            onChange={handleInputChange}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Tên người dùng" name="fullName">
                                        <Input
                                            name="fullName"
                                            value={searchTerms.fullName}
                                            placeholder="Tìm kiếm theo tên người dùng"
                                            onChange={handleInputChange}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Số điện thoại" name="phone">
                                        <Input
                                            name="phone"
                                            value={searchTerms.phone}
                                            placeholder="Tìm kiếm theo số điện thoại"
                                            onChange={handleInputChange}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Email" name="email">
                                        <Input
                                            name="email"
                                            value={searchTerms.email}
                                            placeholder="Tìm kiếm theo email"
                                            onChange={handleInputChange}
                                        />
                                    </Form.Item>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Form.Item label="Ngày tạo" name="createDate">
                                        <DatePicker
                                            placeholder="Tìm kiếm theo ngày tạo"
                                            onChange={handleDateChange}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Quyền" name="role">
                                        <Select
                                            placeholder="Tìm kiếm theo quyền"
                                            value={searchTerms.role}
                                            options={roles}
                                            onChange={handleRoleChange}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Trạng thái" name="voided">
                                        <Select
                                            placeholder="Tìm kiếm theo trạng thái"
                                            value={searchTerms.voided}
                                            options={statuses}
                                            onChange={handleStatusChange}
                                        />
                                    </Form.Item>
                                </Grid>
                            </Grid>
                            <div>
                                <Button type="primary" onClick={handleSearch}>
                                    <SearchOutlined /> Tìm kiếm
                                </Button>
                                {removeFilter && (
                                    <Button type="dashed" onClick={handleRemoveFilter} style={{ marginLeft: "20px" }}>
                                        <CloseOutlined /> Bỏ lọc
                                    </Button>
                                )}
                            </div>
                        </Form>
                        <Button type="primary" className="bg-blue-600" onClick={openForm}>
                            Thêm người dùng
                        </Button>
                    </div>
                    <div className="table-container relative">
                        <div className="mb-8">
                            {isLoadingThunk || currentUsers.length === 0 ? (
                                <Grid
                                    item
                                    xs={12}
                                    style={{ display: "flex", justifyContent: "center" }}
                                >
                                    {isLoading ? <CircularProgress /> : <h5>Không có dữ liệu</h5>}
                                </Grid>
                            ) : (
                                <Table
                                    columns={columns}
                                    dataSource={currentUsers}
                                    pagination={false}
                                />
                            )}
                        </div>
                        <div className="flex justify-center">
                            <Pagination
                                count={Math.ceil(allUsers.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
