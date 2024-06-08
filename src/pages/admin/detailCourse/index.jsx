import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormAddChapter from "../../../components/form/FormAddChapter";
import FormAddLesson from "../../../components/form/FormAddLesson";
import { addNewChapter, editChapterAPIs } from "../../../api/chapterAPIs";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SourceIcon from "@mui/icons-material/Source";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import {
  addNewLesson,
  deleteLesson,
  editLesson,
} from "../../../api/lessonAPIs";
import AddIcon from "@mui/icons-material/Add";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getChaptersThunk } from "../../../redux/reducer/chapterSlice";
import { getLessonsThunk } from "../../../redux/reducer/lessonSlice";
import { getAllCoursesAPI } from "../../../redux/reducer/courseSlice";
import { notify } from "../../../utils/notification";
import VideoComponent from "../../../components/video/VideoComponent";
import CKEditorComponent from "../../../components/ckEditor/CkEditorComponent";
export default function DetailCourse() {
  const chapters = useSelector((state) => state.chapterSlice.chapters);
  const lesson = useSelector((state) => state.lessonSlice.lesson);
  const isLoading = useSelector((state) => state.chapterSlice.loading);
  const [expanded, setExpanded] = useState("panel1");
  const [sourceVideo, setSourceVideo] = useState(
    ""
  );
  const [description, setDescription] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showFormAddChapter, setShowFormAddChapter] = useState(false);
  const [showFormAddLesson, setShowFormAddLesson] = useState(false);
  const [idChapter, setIdChapter] = useState(null);
  const [editChapter, setEditChapter] = useState(null);
  const [choice, setChoice] = useState("video");
  const [isSaving, setIsSaving] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChaptersThunk(id));
    dispatch(getLessonsThunk());
    dispatch(getAllCoursesAPI({ page: 0, size: 4 }));
  }, [dispatch, id]);
  useEffect(() => {
    // Tự động áp dụng highlight cho tất cả code blocks
    hljs.highlightAll();
  }, []);
  // Nhóm dữ liệu lại
  const groupedContentItems = chapters?.map((chapter) => {
    return {
      ...chapter,
      lessons: lesson.filter((item) => item.chapterId === chapter.id),
    };
  });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  //Hàm hiển thị form thêm mới khóa học
  const openForm = (type) => {
    if (type === "chapter") {
      setShowFormAddChapter(true);
    } else {
      setShowFormAddLesson(true);
    }
  };

  //Hàm hiển thị form thêm mới khóa học
  const closeFormChapter = () => {
    setEditChapter(null);
    setShowFormAddChapter(false);
  };
  const closeFormLesson = () => {
    setShowFormAddLesson(false);
    setSelectedLesson(null);
  };

  const handleOpenFormLesson = (id) => {
    openForm("lesson");
    setIdChapter(id);
  };
  const handleOpenFormChapter = () => {
    openForm("chapter");
  };
  const handleSaveChapter = async (infoChapter) => {
    // Validate các trường bắt buộc của infoChapter
    if (!infoChapter.title || !infoChapter.description) {
      notify("error", "Vui lòng điền đầy đủ thông tin chương học");
      return;
    }
    if (infoChapter.type === "edit") {
      await editChapterAPIs(infoChapter);
    } else {
      await addNewChapter(infoChapter);
    }
    dispatch(getChaptersThunk(id));
    // Đóng form thêm/chỉnh sửa chương học
    closeFormChapter();
  };

  const handleSaveLesson = async (infoLesson, onEnd) => {
    // Basic validation
    if (!infoLesson.title || !idChapter) {
      notify("error", "Vui lòng điền đầy đủ thông tin bài học ");
      return;
    }
    const lesson = {
      ...infoLesson,
      chapterId: idChapter,
    };
    try {
      if (infoLesson.type === "edit") {
        await editLesson(lesson);
      } else {
        await addNewLesson(lesson);
      }
      dispatch(getLessonsThunk());
      closeFormLesson();
    } catch (error) {
      console.log(error);
      notify("error", "Có lỗi xảy ra khi thêm bài học");
    } finally {
      if (onEnd) onEnd();
    }
  };
  // Sửa bài học
  const handleEditLesson = (lesson) => {
    // Cập nhật trạng thái và mở form sửa với thông tin của bài học
    setSelectedLesson(lesson);
    setShowFormAddLesson(true);
    setIdChapter(lesson.chapterId);
  };
  // Xóa bài học
  const handleDeleteLesson = async (id) => {
    await deleteLesson(id);
  };
  // Sửa chương học
  const handleEditChapter = (chapter) => {
    openForm("chapter");
    setEditChapter(chapter);
  };
  // Ck Editor
  function handleGetValue(value) {
    setDescription(value);
  }
  // Sửa bài học
  const handleSaveDescription = async () => {
    setIsSaving(true);
    try {
      const lesson = {
        ...selectedLesson,
        description: description,
        chapterId: idChapter,
      };
      await editLesson(lesson);
      dispatch(getLessonsThunk());
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {showFormAddChapter && (
        <FormAddChapter
          closeForm={closeFormChapter}
          handleOk={handleSaveChapter}
          editChapter={editChapter}
        />
      )}
      {showFormAddLesson && (
        <FormAddLesson
          closeForm={closeFormLesson}
          handleOk={handleSaveLesson}
          editLesson={selectedLesson}
        />
      )}
      <div className="w-full">
        <div className="bg-[#f8f8f8]  py-20 overflow-hidden h-full">
          <div className="my-0 mx-auto max-w-[1500px]">
            <h1 className="text-2xl font-bold text-[#170F49]  bg-[#f8f8f8] rounded-lg mb-10">
              <span className="text-rikkei">Khóa học: </span>
              {chapters[0]?.courseName}{" "}
            </h1>
            <div className="my-0 mx-auto max-w-[1500px]">
              {/*<Box*/}
              {/*  sx={{*/}
              {/*    display: "flex",*/}
              {/*    alignItems: "center",*/}
              {/*    "& > *": {*/}
              {/*      m: 1,*/}
              {/*    },*/}
              {/*  }}*/}
              {/*>*/}
              {/*  {selectedLesson ? (*/}
              {/*    <ButtonGroup*/}
              {/*      variant="outlined"*/}
              {/*      aria-label="Basic button group"*/}
              {/*    >*/}
              {/*      <Button*/}
              {/*        onClick={() => setChoice("video")}*/}
              {/*        startIcon={<YouTubeIcon />}*/}
              {/*      >*/}
              {/*        video*/}
              {/*      </Button>*/}
              {/*      <Button*/}
              {/*        onClick={() => setChoice("lesson")}*/}
              {/*        startIcon={<SourceIcon />}*/}
              {/*      >*/}
              {/*        Bài học*/}
              {/*      </Button>*/}
              {/*      {choice === "lesson" ? (*/}
              {/*        <Button*/}
              {/*          onClick={handleSaveDescription}*/}
              {/*          startIcon={*/}
              {/*            isSaving ? (*/}
              {/*              <CircularProgress size={20} color="inherit" />*/}
              {/*            ) : (*/}
              {/*              <SaveAltIcon />*/}
              {/*            )*/}
              {/*          }*/}
              {/*          disabled={isSaving}*/}
              {/*        >*/}
              {/*          {isSaving ? "Đang lưu..." : "Lưu"}*/}
              {/*        </Button>*/}
              {/*      ) : (*/}
              {/*        ""*/}
              {/*      )}*/}
              {/*    </ButtonGroup>*/}
              {/*  ) : (*/}
              {/*    ""*/}
              {/*  )}*/}
              {/*</Box>*/}
              <div className="flex flex-wrap justify-between">
                {/*<div className="rounded-2xl overflow-hidden max-w-[70%] w-full relative h-[610px] ">*/}
                {/*  {choice === "video" ? (*/}
                {/*    <div className="px-[100px] bg-black">*/}
                {/*      <VideoComponent sourceVideo={"https://www.youtube.com/embed/"+sourceVideo.split("=")[1]} />*/}
                {/*    </div>*/}
                {/*  ) : (*/}
                {/*    <div className="bg-slate-50">*/}
                {/*      <CKEditorComponent*/}
                {/*        getValue={handleGetValue}*/}
                {/*        oldValue={description}*/}
                {/*      />*/}
                {/*    </div>*/}
                {/*  )}*/}
                {/*</div>*/}
                <div className="max-w-[90%] w-full flex flex-col bg-white max-h-[610px] p-2 overflow-y-auto">
                  {isLoading ? (
                    <>
                      {" "}
                      <Grid
                        item
                        xs={12}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <CircularProgress />
                      </Grid>
                    </>
                  ) : (
                    <>
                      {" "}
                      {groupedContentItems?.map((chapter) => (
                        <Accordion
                          sx={{ maxHeight: "50%" }}
                          className="text-xl font-medium text-[#170F49] "
                          expanded={expanded === `panel${chapter.id}`}
                          onChange={handleChange(`panel${chapter.id}`)}
                          key={chapter.id}
                          onClick={() => {
                            setIdChapter(chapter.id);
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              expanded === `panel${chapter.id}` ? (
                                <RemoveIcon
                                  fontSize="small"
                                  sx={{ color: "#BC2228" }}
                                />
                              ) : (
                                <AddIcon
                                  fontSize="small"
                                  sx={{ color: "#BC2228" }}
                                />
                              )
                            }
                            aria-controls={`panel${chapter.id}-content`}
                            id={`panel${chapter.id}-header`}
                            sx={{
                              minHeight: "2rem",
                              color: "#BC2228",
                              borderRadius: "20px",
                              fontSize: "16px",
                            }}
                          >
                            <p className="m-0">{chapter?.title}</p>
                            <IconButton
                              color="primary"
                              aria-label="add source"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleEditChapter(chapter);
                              }}
                              sx={{
                                width: "2rem",
                                height: "2rem",
                                ml: "10px",
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </AccordionSummary>
                          <div
                            onClick={() => handleOpenFormLesson(chapter.id)}
                            className="cursor-pointer font-medium text-blue-500 hover:bg-blue-100 transition duration-300 ease-in-out transform p-2 rounded-lg mx-5 flex items-center gap-2"
                          >
                            <AddCircleIcon /> <span> Thêm bài học...</span>
                          </div>
                          <div className="overflow-y-auto max-h-40 bg-white rounded-[20px] ">
                            {chapter?.lessons?.length > 0 ? (
                              chapter?.lessons?.map((item) => (
                                <AccordionDetails
                                  sx={{
                                    height: "60px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                    alignItems: "center",
                                    fontSize: "16px",
                                  }}
                                  key={item.id}
                                  onClick={() => {

                                    item.video && setSourceVideo(item.video);
                                    setSelectedLesson(item);
                                    setDescription(item.description);
                                  }}
                                >
                                  <p
                                    className={`max-w-[80%] ${
                                      selectedLesson?.id === item.id
                                        ? "text-red-500"
                                        : ""
                                    }`}
                                  >
                                    {item?.title}
                                  </p>

                                  <div className="flex items-center ">
                                    <IconButton
                                      color="primary"
                                      aria-label="add to shopping cart"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        handleEditLesson(item);
                                      }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                      aria-label="delete"
                                      color="error"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        handleDeleteLesson(item.id);
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </div>
                                </AccordionDetails>
                              ))
                            ) : (
                              <div style={{ padding: "12px 16px" }}>
                                Coming soon...
                              </div>
                            )}
                          </div>
                        </Accordion>
                      ))}
                    </>
                  )}

                  <div
                    onClick={handleOpenFormChapter}
                    className="text-xl cursor-pointer font-semibold mt-5 text-blue-500 gap-2 hover:bg-blue-100 transition duration-300 ease-in-out transform p-2 rounded-lg flex items-center justify-center"
                  >
                    <AddCircleIcon /> Thêm chương học mới
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
