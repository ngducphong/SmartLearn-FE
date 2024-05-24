import {Button, Input} from "antd";
import Pagination from "@mui/material/Pagination";
import React, {useEffect, useState} from "react";
import CachedIcon from "@mui/icons-material/Cached";
import {Select} from "antd";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getUsersThunk} from "../../../redux/reducer/userSlice";
import FormUser from "../../../components/form/FormUser";
import {createUser, editUserApi} from "../../../api/userAPIs";
import useDebounce from "../../../hooks/useDebounce";
import {CircularProgress, Grid} from "@mui/material";

export default function UserMangagement() {
    const allUsers = useSelector((state) => state.userSlice.users);
    const isLoadingThunk = useSelector((state) => state.userSlice.loading);
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [editUser, setEditUser] = useState(null);
    const [flag, setFlag] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // Sử dụng useDebounce
    const debouncedSearchTerm = useDebounce(searchTerm, 2000);
    // Phân trang
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = allUsers.slice(indexOfFirstItem, indexOfLastItem);
    const calculateIndex = (index) => index + 1;
    //Hàm hiển thị form thêm mới người dùng
    const openForm = () => {
        setShowForm(true);
    };
    //Hàm đóng form thêm mới người dùng
    const closeForm = () => {
        setShowForm(false);
        setEditUser(null);
    };
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "",
            align: "center",
            render: (_, __, index) => calculateIndex(index),
        },
        {
            title: "Username",
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
        // loading lại trang
        fetchUsers();
    };
    // Sắp xếp theo thứ tự tăng giảm
    // const handleSort = (value) => {
    //     if ('lucy' === value){
    //         getUsersThunk()
    //     }else if ('jack' === value){
    //         getUsersThunk()
    //     }
    // }
    // Tìm kiếm người dùng
    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
    const fetchUsers = () => {
        setIsLoading(true);
        try {
            dispatch(getUsersThunk({searchValue: searchTerm}));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, [debouncedSearchTerm]);
    return (
        <>
            {" "}
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
                        <div className="flex items-center justify-end gap-3">
                            {/*<Select*/}
                            {/*    defaultValue="Sắp xếp"*/}
                            {/*    style={{*/}
                            {/*        width: 200,*/}
                            {/*    }}*/}
                            {/*    onChange={handleSort}*/}
                            {/*    options={[*/}
                            {/*        {*/}
                            {/*            value: "jack",*/}
                            {/*            label: "Thứ tự tăng dần",*/}
                            {/*        },*/}
                            {/*        {*/}
                            {/*            value: "lucy",*/}
                            {/*            label: "Thứ tự giảm dần",*/}
                            {/*        },*/}
                            {/*    ]}*/}
                            {/*/>*/}
                            <Input
                                className="w-[300px]"
                                placeholder="Tìm kiếm người dùng theo tên"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            {/*<CachedIcon/>*/}
                        </div>
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
                                    style={{display: "flex", justifyContent: "center"}}
                                >
                                    <CircularProgress/>
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
