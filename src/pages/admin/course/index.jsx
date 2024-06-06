import {Button, Image, Input} from "antd";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import { Select } from "antd";
import { Table } from "antd";
import FormAddCourse from "../../../components/form/FormAddCourse";
import { useNavigate } from "react-router-dom";
import {addNewCourse, editCourse, getImgCourse} from "../../../api/courseAPIs";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesAPI } from "../../../redux/reducer/courseSlice";
import MyModal from "../../../components/modal/Modal";
import FormEditCourse from "../../../components/form/FormEditCourse";
import useDebounce from "../../../hooks/useDebounce";
import { CircularProgress, Grid } from "@mui/material";

export default function Course() {
  //#region redux
  const allCourses = useSelector((state) => state.courseSlice);
  const isLoading = useSelector((state) => state.courseSlice.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //#endregion

  //#region State
  const [showForm, setShowForm] = useState(false);
  const [flag, setFlag] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [pagination, setPagination] = useState(1);
  const [editCourseInfo, setEditCourseInfo] = useState(null);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);
  //#endregion
  useEffect(() => {
    dispatch(getAllCoursesAPI({ page: 0, size: 4 }));
    setPagination(1);
  }, [flag]);

  // Hàm tính toán số thứ tự cho mỗi dòng dữ l  iệu
  const calculateIndex = (index) => index + 1;
  // Click chuyển trang
  const handlePageChange = (page, value) => {
    dispatch(getAllCoursesAPI({ page: value - 1, size: 4 }));
    setPagination(value);
  };
  // Thêm key khi map
  const dataSource = allCourses?.courses?.map((course) => ({
    ...course,
    key: course.id,
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "",
      align: "center",
      render: (_, __, index) => calculateIndex(index),
    },
    {
      title: "Tên khóa học",
      dataIndex: "title",
      align: "center",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      align: "center",
      render: (text) => <img src={"http://localhost:8080/img/" + text} alt={""} width={100} /> ,
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
      title: "Giá tiền",
      dataIndex: "price",
      align: "center",
      render: (price) => {
        // Định dạng giá tiền thành chuỗi tiền tệ
        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        return <p>{formattedPrice}</p>;
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
            <Button onClick={() => navigate(`/admin/course/${item.id}`)}>
              Chi tiết khóa học
            </Button>
            <Button onClick={() => handleEditCourse(item)}>Chỉnh sửa</Button>
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
  const handleAddNewCourse = async (newCourse, onEnd) => {
    try {
      await addNewCourse(newCourse);
      setFlag(!flag);
      closeForm();
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
      dispatch(getAllCoursesAPI({ page: 0, searchValue: searchTerm, size: 4 }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingFetch(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [debouncedSearchTerm, dispatch]);
  // Hàm chỉnh sửa thông tin khóa học
  const handleEditCourse = (courseItem) => {
    setEditCourseInfo(courseItem);
    openFormEdit();
  };
  // Hàm lưu thông tin khi sửa khóa học
  const handleSave = async (courseEdit) => {
    try {
      await editCourse(courseEdit);
      setPagination(1);
      setFlag(!flag);
      closeFormEdit();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <MyModal
        isOpen={isModalVisible}
        onOk={handleCancelModal}
        onCancel={handleCancelModal}
        description={selectedCourse}
      />
      {/* Form thêm mới khóa học */}
      {showForm && (
        <FormAddCourse closeForm={closeForm} handleOk={handleAddNewCourse} />
      )}
      {showFormEdit && (
        <FormEditCourse
          closeFormEdit={closeFormEdit}
          handleEdit={handleSave}
          courseInfo={editCourseInfo}
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
            {isLoading || isLoadingFetch ? (
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
              count={allCourses?.totalPages}
              page={pagination}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
      </div>
    </>
  );
}
