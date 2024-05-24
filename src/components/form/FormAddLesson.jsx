import React, { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, Button, Input, Spin } from "antd";
import "./index.css";
import axios from "axios";
export default function FormAddLesson({ closeForm, handleOk, editLesson }) {
  const [title, setTitle] = useState(editLesson?.title || "");
  const [description, setDescription] = useState(editLesson?.description || "");
  const [linkVideo, setLinkVideo] = useState(editLesson?.video || "");
  const [source, setSource] = useState(editLesson?.resources || "");
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null);
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      closeForm();
    }
  };
  const onStart = () => {
    setIsLoading(true);
  };

  const onEnd = () => {
    setIsLoading(false);
  };
  return (
    <>
      {editLesson ? (
        <>
          <div className="overlay" onClick={handleClickOutside}>
            <form
              ref={formRef}
              className="fade-down bg-white w-[50%] px-[24px] py-[20px] rounded"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-[20px] font-semibold">Sửa bài học</h3>
                <CloseIcon
                  onClick={closeForm}
                  className="cursor-pointer hover:text-gray-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mt-3">
                <div>
                  <label htmlFor="">Tên bài học</label>
                  <Input
                    className="mt-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-3">
                <div>
                  <label htmlFor="">Link video</label>
                  <Input
                    className="mt-2"
                    value={linkVideo}
                    onChange={(e) => setLinkVideo(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-3">
                <div>
                  <label htmlFor="">Link tài nguyên</label>
                  <Input
                    className="mt-2"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </div>
              </div>

              <Divider />
              <div className="flex justify-end gap-2">
                <Button onClick={closeForm}>Hủy</Button>
                <Button
                  type="primary"
                  className="bg-blue-600"
                  onClick={() => {
                    onStart();
                    handleOk(
                      {
                        title,
                        description,
                        id: editLesson?.id,
                        source,
                        linkVideo,
                        type: "edit",
                      },
                      onEnd
                    );
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <Spin /> : "Lưu"}
                </Button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="overlay" onClick={handleClickOutside}>
            <form
              ref={formRef}
              className="fade-down bg-white w-[50%] px-[24px] py-[20px] rounded"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-[20px] font-semibold">Thêm mới bài học</h3>
                <CloseIcon
                  onClick={closeForm}
                  className="cursor-pointer hover:text-gray-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mt-3">
                <div>
                  <label htmlFor="">Tên bài học</label>
                  <Input
                    className="mt-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-3">
                <div>
                  <label htmlFor="">Link video</label>
                  <Input
                    className="mt-2"
                    value={linkVideo}
                    onChange={(e) => setLinkVideo(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-3">
                <div>
                  <label htmlFor="">Link tài nguyên</label>
                  <Input
                    className="mt-2"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </div>
              </div>

              <Divider />
              <div className="flex justify-end gap-2">
                <Button onClick={closeForm}>Hủy</Button>
                <Button
                  type="primary"
                  className="bg-blue-600"
                  onClick={() => {
                    onStart();
                    handleOk(
                      {
                        title,
                        description,
                        source,
                        linkVideo,
                        type: editLesson ? "edit" : "add",
                      },
                      onEnd
                    );
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <Spin /> : "Lưu"}
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
