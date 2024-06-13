import AddIcon from "@mui/icons-material/Add";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Stack,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getChaptersThunk } from "../../../redux/reducer/chapterSlice";
import { getLessonsThunk } from "../../../redux/reducer/lessonSlice";
import { getAllCoursesAPI } from "../../../redux/reducer/courseSlice";
import VideoComponent from "../../../components/video/VideoComponent";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Cookies from "js-cookie";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { getOneCourses } from "../../../api/courseAPIs";
import DateCommponent from "../../../components/date/DateCommponent.jsx";
const LearningCourse = () => {
  const chapters = useSelector((state) => state.chapterSlice.chapters);
  const lesson = useSelector((state) => state.lessonSlice.lesson);
  const isLoading = useSelector((state) => state.chapterSlice.loading);
  const [expanded, setExpanded] = useState("");
  const [description, setDescription] = useState("");
  const [sourceVideo, setSourceVideo] = useState("");
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [titleLesson, setTitleLesson] = useState("");
  const [resourcesLesson, setResourcesLesson] = useState("");
  const [documentLesson, setDocumentLesson] = useState("");
  const [modifyDateLesson, setModifyDateLesson] = useState();
  const [currentCourse, setCurrentCourse] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const getAuthToken = () => Cookies.get("accessToken");
    if (!getAuthToken()) {
      return navigate("/");
    }
    handleGetDataCourse();
    dispatch(getChaptersThunk(id));
    dispatch(getLessonsThunk());
    dispatch(getAllCoursesAPI({ page: 0, size: 4 }));
  }, [dispatch, id]);
  // Highlight Js
  useEffect(() => {
    hljs.highlightAll();
  }, [description]);
  // Set Chapter đầu tiên
  useEffect(() => {
    if (chapters.length > 0) {
      setExpanded(`panel${chapters[0].id}`);
    }
  }, [chapters]);
  const handleGetDataCourse = async () => {
    const courseInfo = await getOneCourses(id);
    setCurrentCourse(courseInfo);
  };
  // Nhóm dữ liệu lại
  const groupedContentItems = chapters?.map((chapter) => {
    return {
      ...chapter,
      lessons: lesson.filter((item) => item.chapterId === chapter.id),
    };
  });
  // Set video và bài học đầu tiên
  useEffect(() => {
    if (groupedContentItems.length > 0) {
      const firstChapter = groupedContentItems[0];
      const firstLesson = firstChapter.lessons[0];
      setSourceVideo(firstLesson.video);
      setDescription(firstLesson.description);
      setTitleLesson(firstLesson.title);
      setModifyDateLesson(firstLesson.modifyDate);
      setDocumentLesson(firstLesson.document);
      setResourcesLesson(firstLesson.resources);
      setSelectedLessonId(firstLesson.id);
    }
  }, [lesson]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleBack = () => {
    const currentChapterIndex = groupedContentItems.findIndex((chapter) =>
      chapter.lessons.some((lesson) => lesson.id === selectedLessonId)
    );
    if (currentChapterIndex >= 0) {
      const currentLessonIndex = groupedContentItems[
        currentChapterIndex
      ].lessons.findIndex((lesson) => lesson.id === selectedLessonId);
      if (currentLessonIndex > 0) {
        // Có bài học trước đó trong chương hiện tại
        const prevLesson =
          groupedContentItems[currentChapterIndex].lessons[
            currentLessonIndex - 1
          ];
        setSourceVideo(prevLesson.video);
        setDescription(prevLesson.description);
        setTitleLesson(prevLesson.title);
        setModifyDateLesson(prevLesson.modifyDate);
        setDocumentLesson(prevLesson.document);
        setResourcesLesson(prevLesson.resources);
        setSelectedLessonId(prevLesson.id);
      } else if (currentChapterIndex > 0) {
        // Chuyển sang chương trước nếu không còn bài học nào ở chương hiện tại
        const prevChapter = groupedContentItems[currentChapterIndex - 1];
        const prevLesson = prevChapter.lessons[prevChapter.lessons.length - 1];
        setSourceVideo(prevLesson.video);
        setDescription(prevLesson.description);
        setTitleLesson(prevLesson.title);
        setModifyDateLesson(prevLesson.modifyDate);
        setDocumentLesson(prevLesson.document);
        setResourcesLesson(prevLesson.resources);
        setSelectedLessonId(prevLesson.id);
        setExpanded(`panel${prevChapter.id}`);
      }
    }
  };

  const handleNext = () => {
    const currentChapterIndex = groupedContentItems.findIndex((chapter) =>
      chapter.lessons.some((lesson) => lesson.id === selectedLessonId)
    );
    if (currentChapterIndex >= 0) {
      const currentLessonIndex = groupedContentItems[
        currentChapterIndex
      ].lessons.findIndex((lesson) => lesson.id === selectedLessonId);
      if (
        currentLessonIndex <
        groupedContentItems[currentChapterIndex].lessons.length - 1
      ) {
        // Có bài học tiếp theo trong chương hiện tại
        const nextLesson =
          groupedContentItems[currentChapterIndex].lessons[
            currentLessonIndex + 1
          ];
        setSourceVideo(nextLesson.video);
        setDescription(nextLesson.description);
        setTitleLesson(nextLesson.title);
        setModifyDateLesson(nextLesson.modifyDate);
        setDocumentLesson(nextLesson.document);
        setResourcesLesson(nextLesson.resources);
        setSelectedLessonId(nextLesson.id);
      } else if (currentChapterIndex < groupedContentItems.length - 1) {
        // Chuyển sang chương tiếp theo nếu không còn bài học nào ở chương hiện tại
        const nextChapter = groupedContentItems[currentChapterIndex + 1];
        const nextLesson = nextChapter.lessons[0];
        setSourceVideo(nextLesson.video);
        setDescription(nextLesson.description);
        setTitleLesson(nextLesson.title);
        setModifyDateLesson(nextLesson.modifyDate);
        setDocumentLesson(nextLesson.document);
        setResourcesLesson(nextLesson.resources);
        setSelectedLessonId(nextLesson.id);
        setExpanded(`panel${nextChapter.id}`);
      }
    }
  };

  return (
    <div className="w-full h-[100vh]">
      <Box>
        <div className="w-full h-[50px] bg-[#29303b] flex items-center px-3 justify-between">
          <div
            className="cursor-pointer"
            onClick={() => navigate(`/courseDetail/${id}`)}
          >
            <ArrowBackIosIcon
              sx={{ color: "white", width: "16px", height: "16px" }}
            />

            <span className="text-white text-[14px] font-semibold ml-2">
              {currentCourse?.title}
            </span>
          </div>

        </div>
        <Box
          className="shadow-lg"
          sx={{
            backgroundColor: "#fff",
            marginBottom: 24,
          }}
        >
          <Box className="shadow-lg bg-white mb-6">
            <Box className="max-w-full">
              <Stack className="flex flex-col lg:!flex-row lg:justify-end gap-2 lg:space-x-4">
                <Box
                  className="w-full lg:flex-1 overflow-auto"
                  style={{ height: "calc(100vh - 50px)" }}
                >
                  {sourceVideo ? (
                    <div className="overflow-y-auto">
                      <div className="px-4 lg:px-24 bg-black">
                        <VideoComponent sourceVideo={sourceVideo} />
                      </div>



                      <div className="container">

                            <div className="card overview-sec">
                              <div className="card-body" style={{margin: "10px 70px 10px 70px"}}>
                                <h5 className="subs-title">{titleLesson}</h5>
                                <p style={{fontSize : "11px" ,display: "flex"}}>
                                  <p style={{paddingRight:"3px"}}>Cập nhập: </p>

                                  <DateCommponent inputDate={modifyDateLesson}/>

                                  </p>
                                <h6>{documentLesson}</h6>
                                <div
                                    className="ckEditor"
                                    dangerouslySetInnerHTML={{
                                      __html: description,
                                    }}
                                />
                              </div>
                            </div>
                      </div>


                    </div>
                  ) : (

                      <div className="overflow-y-auto">


                          <div className="container">

                              <div className="card overview-sec">
                                  <div className="card-body" style={{margin: "10px 70px 10px 70px"}}>
                                      <h5 className="subs-title">{titleLesson}</h5>
                                      <p style={{fontSize : "11px" ,display: "flex"}}>
                                          <p style={{paddingRight:"3px"}}>Cập nhập: </p>

                                          <DateCommponent inputDate={modifyDateLesson}/>

                                      </p>
                                      <h6>{documentLesson}</h6>
                                      <div
                                          className="ckEditor"
                                          dangerouslySetInnerHTML={{
                                              __html: description,
                                          }}
                                      />
                                  </div>
                              </div>
                          </div>


                      </div>
                  )}
                </Box>
                <Stack className="w-full lg:w-1/5 max-h-screen overflow-y-auto">
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <CircularProgress />
                    </div>
                  ) : (
                    <div className="h-full border border-l-black">
                      {groupedContentItems.length > 0 ? (
                        <>
                          {groupedContentItems.map((chapter) => (
                            <Accordion
                              className="text-primary font-medium  last:mb-0"
                              expanded={expanded === `panel${chapter.id}`}
                              onChange={handleChange(`panel${chapter.id}`)}
                              key={chapter.id}
                            >
                              <AccordionSummary
                                expandIcon={
                                  expanded === `panel${chapter.id}` ? (
                                    <RemoveIcon fontSize="medium" />
                                  ) : (
                                    <AddIcon fontSize="medium" />
                                  )
                                }
                                aria-controls={`panel${chapter.id}-content`}
                                id={`panel${chapter.id}-header`}
                              >
                                <span className="font-bold text-rikkei">
                                  {chapter?.title}
                                </span>
                              </AccordionSummary>
                              <div className=" max-h-fit overflow-y-auto bg-white rounded-lg">
                                <Divider />
                                {chapter?.lessons?.length > 0 ? (
                                  chapter.lessons.map((item) => (
                                    <AccordionDetails
                                      key={item.id}
                                      onClick={() => {
                                        setSourceVideo(item.video);
                                        setSelectedLessonId(item.id);
                                        setDescription(item.description);
                                        setTitleLesson(item.title);
                                        setModifyDateLesson(item.modifyDate);
                                        setDocumentLesson(item.document);
                                        setResourcesLesson(item.resources);
                                      }}
                                      className="flex justify-between items-center cursor-pointer px-4 py-2"
                                    >
                                      <div
                                        className={`w-4/5 font-bold ${
                                          selectedLessonId === item.id
                                            ? "text-rikkei"
                                            : "text-black"
                                        }`}
                                      >
                                        {item?.title}
                                      </div>
                                      <div className="flex items-center">
                                        {item?.video ? (
                                          <img
                                            src="/assets/img/Playbtn.png"
                                            alt=""
                                            className="w-5 h-5"
                                          />
                                        ) : (
                                          <MenuBookIcon />
                                        )}
                                      </div>
                                    </AccordionDetails>
                                  ))
                                ) : (
                                  <div className="p-3 !text-black">
                                    Coming soon...
                                  </div>
                                )}
                              </div>
                            </Accordion>
                          ))}
                        </>
                      ) : (
                        <h1>Coming Soon</h1>
                      )}
                    </div>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
        <div className="fixed bottom-0 w-full h-[50px] bg-[#f0f0f0] flex justify-center">
          <div className="flex items-center px-3 justify-between">
            <div className="flex items-center cursor-pointer">
              <ArrowBackIosIcon
                sx={{ color: "#404040", width: "16px", height: "16px" }}
              />
              <span
                className="text-[#404040] text-[14px] font-semibold ml-2"
                onClick={handleBack}
              >
                Bài trước
              </span>
            </div>
            <div
              className="flex items-center ml-3 p-[10px] cursor-pointer rounded-md"
              style={{ border: "2px solid #BC2228 " }}
            >
              <span
                className="text-rikkei text-[14px] font-semibold ml-2 mr-2"
                onClick={handleNext}
              >
                Bài tiếp theo
              </span>
              <ArrowForwardIosIcon
                sx={{ color: "#BC2228", width: "16px", height: "16px" }}
              />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default LearningCourse;
