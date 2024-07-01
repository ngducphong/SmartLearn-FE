import React, { useEffect, useState } from "react";
import { Button, Image, Input, Select, DatePicker, Form, Table } from "antd";
import Pagination from "@mui/material/Pagination";
import { CircularProgress, Grid } from "@mui/material";
import { CloseOutlined } from "@ant-design/icons";
import MyModal from "../../../components/modal/Modal.jsx";
import FormAddCourse from "../../../components/form/FormAddCourse.jsx";
import FormEditCourse from "../../../components/form/FormEditCourse.jsx";
import { addNewCourse, editCourse, getAllCourses } from "../../../api/courseAPIs.js";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function CourseManagement() {
  const navigate = useNavigate();
  //#region State
  const [showForm, setShowForm] = useState(false);
  const [flag, setFlag] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [pagination, setPagination] = useState(1);
  const [editCourseInfo, setEditCourseInfo] = useState(null);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    name: "",
    price: null,
    voided: "",
    createDate: null
  });
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  //#endregion

  const [listCourse, setListCourse] = useState([]);
  const [coursePage, setCoursePage] = useState();
  const [isLoadingListCourse, setIsLoadingListCourse] = useState(false);
  const [removeFilter, setRemoveFilter] = useState(false);

  const getListCourse = async (page, searchTerms, size) => {
    setIsLoadingListCourse(true);
    const data = await getAllCourses(page, searchTerms, size);
    setCoursePage(data.totalPages);
    setListCourse(data.content);
    setIsLoadingListCourse(false);
  };

  const calculateIndex = (index) => index + 1;

  const handlePageChange = (event, value) => {
    getListCourse(value - 1, searchTerms, 4);
    setPagination(value);
  };

  const dataSource = listCourse?.map((course) => ({
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
      render: (text) => <img src={"http://localhost:8080/img/" + text} alt={""} width={100} />,
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

  const handleAddNewCourse = async (newCourse, onEnd) => {
    try {
      await addNewCourse(newCourse);
      setFlag(!flag);
      closeForm();
      getListCourse(0, searchTerms, 4);
    } catch (error) {
      console.log(error);
    } finally {
      if (onEnd) onEnd();
    }
  };

  const handleSearch = () => {
    setRemoveFilter(true);
    getListCourse(0, searchTerms, 4);
  };

  const handleRemoveFilter = () => {
    setRemoveFilter(false);
    setSearchTerms({
      name: "",
      price: null,
      voided: "",
      createDate: null,
    });
    getListCourse(0, {
      name: "",
      price: null,
      voided: "",
      createDate: null,
    }, 4);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [name]: value,
    }));
  };

  const handlePriceChange = (value) => {
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      price: value,
    }));
  };

  const handleStatusChange = (value) => {
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      voided: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      createDate: dateString,
    }));
  };

  useEffect(() => {
    getListCourse(0, {}, 4);
  }, []);

  const handleEditCourse = (courseItem) => {
    setEditCourseInfo(courseItem);
    openFormEdit();
  };

  const handleSave = async (courseEdit) => {
    try {
      await editCourse(courseEdit);
      setPagination(1);
      setFlag(!flag);
      closeFormEdit();
      getListCourse(0, searchTerms, 4);
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
            <FormAddCourse closeForm={closeForm} handleOk={handleAddNewCourse} />
        )}
        {showFormEdit && (
            <FormEditCourse
                closeFormEdit={closeFormEdit}
                handleSave={handleSave}
                courseInfo={editCourseInfo}
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
                  <Form.Item label="Tên khóa học" name="name">
                    <Input
                        name="name"
                        value={searchTerms.name}
                        placeholder="Tìm kiếm theo tên khóa học"
                        onChange={handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item label="Ngày tạo" name="dateRange">

                    <DatePicker
                        placeholder="Tìm kiếm theo ngày tạo"
                        // value={searchTerms.createDate ? moment(searchTerms.createDate) : null}
                        onChange={handleDateChange}
                    />
                  </Form.Item>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Form.Item label="Giá tiền" name="price">
                    <Select
                        placeholder="Tìm kiếm theo giá tiền"
                        value={searchTerms.price}
                        onChange={handlePriceChange}
                        allowClear
                    >
                      <Option value="0-500000">0 - 500,000 VND</Option>
                      <Option value="500000-1000000">500,000 - 1,000,000 VND</Option>
                      <Option value="1000000-2000000">1,000,000 - 2,000,000 VND</Option>
                      <Option value="2000000-9999999999">Lớn hơn 2,000,000 VND</Option>
                    </Select>
                  </Form.Item>
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
              Thêm khóa học
            </Button>
          </div>
          <div className="table-container relative">
            <div className="mb-8">
              {isLoadingListCourse || isLoadingFetch ? (
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
                  count={coursePage}
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
