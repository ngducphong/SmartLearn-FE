import React, {useEffect, useState} from "react";
import MyModal from "../../../components/modal/Modal.jsx";
import FormAddCourse from "../../../components/form/FormAddCourse.jsx";
import FormEditCourse from "../../../components/form/FormEditCourse.jsx";
import {Button, Input, Table} from "antd";
import {CircularProgress, Grid} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {getAllCoursesAPI} from "../../../redux/reducer/courseSlice.js";
import useDebounce from "../../../hooks/useDebounce.js";
import {addNewCategory, editCategory, getPageCategory} from "../../../api/categoryAPIs.js";
import FormAddCategory from "../../../components/form/FormAddCategory.jsx";

export default function CategoryManagement() {
    //#region State
    const [showForm, setShowForm] = useState(false);
    const [flag, setFlag] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [pagination, setPagination] = useState(1);
    const [editCategoryInfo, setEditCategoryInfo] = useState(null);
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoadingFetch, setIsLoadingFetch] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 2000);
    //#endregion

    const [listCategory, setListCategory] = useState([]);
    const [categoryPage, setCategoryPage] = useState();

    const [isLoadingListCategory, setIsLoadingListCategory] = useState(false);
    const getListCategory = async (page, searchValue, size) => {
        setIsLoadingListCategory(true)
        const data = await getPageCategory(page, searchValue ,size);
        setCategoryPage(data.totalPages);
        setListCategory(data.content);
        setIsLoadingListCategory(false)
    }
    // useEffect(() => {
    //     getListCategory(0, null, 2);
    // }, []);


    // Hàm tính toán số thứ tự cho mỗi dòng dữ l  iệu
    const calculateIndex = (index) => index + 1;
    // Click chuyển trang
    const handlePageChange = (page, value) => {
        getListCategory(value-1, null, 2)
        setPagination(value);
    };
    // Thêm key khi map
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
            render: (item) => {
                return (
                    <div className="flex justify-evenly ">
                        <Button onClick={() => handleEditCategory(item)}>Chỉnh sửa</Button>
                    </div>
                );
            },
        },
    ];

    //Hàm hiển thị form thêm mới khóa học
    const openForm = () => {
        setShowForm(true);
    };
    //Hàm đóng form thêm mới khóa học
    const closeForm = () => {
        setShowForm(false);
    };
    //Hàm hiển thị form sửa khóa học
    const openFormEdit = () => {
        setShowFormEdit(true);
    };
    //Hàm đóng form sửa khóa học
    const closeFormEdit = () => {
        setShowFormEdit(false);
    };
    // Hiển thị modal mô tả
    const handleShowModal = (description) => {
        setSelectedCourse(description);
        setIsModalVisible(true);
    };
    // Tắt modal mô tả
    const handleCancelModal = () => {
        setIsModalVisible(false);
    };
    // Change...
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    // Thêm khóa học
    const handleAddNewCategory = async (newCategory, onEnd) => {
        try {
            await addNewCategory(newCategory);
            setFlag(!flag);
            closeForm();
            getListCategory(0, null, 2);
        } catch (error) {
            console.log(error);
        } finally {
            if (onEnd) onEnd();
        }
    };

    // Tìm kiếm khóa học
    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
    const fetchCourses = () => {
        try {
            setIsLoadingFetch(true);
            getListCategory(0, searchTerm, 2)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingFetch(false);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, [debouncedSearchTerm]);
    // Hàm chỉnh sửa thông tin khóa học
    const handleEditCategory = (categoryItem) => {
        setEditCategoryInfo(categoryItem);
        openFormEdit();
    };
    // Hàm lưu thông tin khi sửa khóa học
    const handleSave = async (categoryEdit) => {
        try {
            await editCategory(categoryEdit);
            setPagination(1);
            setFlag(!flag);
            closeFormEdit();
            getListCategory(0, null, 2);
        } catch (error) {
            console.log(error);
        }
    };
  return (
      <div className="px-6 py-3 flex flex-col  w-full">
        <MyModal
            isOpen={isModalVisible}
            onOk={handleCancelModal}
            onCancel={handleCancelModal}
            description={selectedCourse}
        />
        {/* Form thêm mới khóa học */}
        {showForm && (
            <FormAddCategory closeForm={closeForm} handleOk={handleAddNewCategory} />
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
            <div className="flex items-center justify-end gap-3">
              {/*<Select*/}
              {/*  defaultValue="Sắp xếp khóa học"*/}
              {/*  style={{*/}
              {/*    width: 200,*/}
              {/*  }}*/}
              {/*  onChange={handleChange}*/}
              {/*  options={[*/}
              {/*    {*/}
              {/*      value: "jack",*/}
              {/*      label: "Thứ tự tăng dần",*/}
              {/*    },*/}
              {/*    {*/}
              {/*      value: "lucy",*/}
              {/*      label: "Thứ tự giảm dần",*/}
              {/*    },*/}
              {/*  ]}*/}
              {/*/>*/}
              <Input
                  className="w-[300px]"
                  placeholder="Tìm kiếm khóa học theo tên"
                  onChange={(e) => handleSearch(e.target.value)}
              />
              {/*<CachedIcon />*/}
            </div>
            <Button onClick={openForm} type="primary" className="bg-blue-600">
              Thêm khóa học
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
                    <CircularProgress style={{ color: "red" }} />
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
