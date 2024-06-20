import React, {useRef, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {Divider, Button, Input, Spin} from "antd";
import "./index.css";
import axios from "axios";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CKEditorComponent from "../ckEditor/CkEditorComponent.jsx";
import CryptoJS from 'crypto-js';
import {CommentOutlined} from "@ant-design/icons";
import FormAddComment from "./FormAddComment.jsx";

export default function FormAddLesson({closeForm, handleOk, editLesson}) {
    const [title, setTitle] = useState(editLesson?.title || "");
    const [description, setDescription] = useState(editLesson?.description || "");
    const [document, setDocument] = useState(editLesson?.document || "");
    const [source, setSource] = useState(editLesson?.resources || "");
    const [isLoading, setIsLoading] = useState(false);
    const [isShowComment, setIsShowComment] = useState(false);
    // const [description2, setDescription2] = useState(null);

    const decrypt = (data, key) => {
        if (data){
            var keyHex = CryptoJS.enc.Utf8.parse(key);
            var decrypted = CryptoJS.AES.decrypt(data, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return decrypted.toString(CryptoJS.enc.Utf8);
        }
        return "";
    }

    var key = "ngducphong010402"; // 16 bytes key
    var encryptedData = editLesson?.video; // Replace with the actual encrypted string from Java
    var decryptedData = decrypt(encryptedData, key);

    const [videoUrl, setVideoUrl] = useState(decryptedData || "");
    const [videoFile, setVideoFile] = useState();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setVideoUrl(reader.result);
        };
        if (file) {
            setVideoFile(file);
            reader.readAsDataURL(file);
            console.log(file);
        }
    };

    function handleGetValue(value) {
        setDescription(value);
    }
    const closedComment = () => {
        setIsShowComment(false);
    };

    const formRef = useRef(null);
    const handleClickOutside = (event) => {
        // if (formRef.current && !formRef.current.contains(event.target)) {
        //   closeForm();
        // }
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
                            className="fade-down bg-white w-[77%] px-[24px] py-[20px] rounded"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-[20px] font-semibold">Sửa bài học</h3>
                                <CloseIcon
                                    onClick={closeForm}
                                    className="cursor-pointer hover:text-gray-500"
                                />
                            </div>

                            <div className="flex"
                            >
                                <div className="w-11/12 pr-5">
                                    <div className="grid grid-cols-1 gap-5 mt-3">
                                        <div>
                                            <label htmlFor="">Tên bài học</label>
                                            <Input
                                                className="mt-2"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 mt-3">
                                        <div>
                                            <label htmlFor="">Tài Liệu</label>
                                            <Input
                                                className="mt-2"
                                                value={document}
                                                onChange={(e) => setDocument(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 mt-3">
                                        <div>
                                            <label htmlFor="">Link tài nguyên</label>
                                            <Input
                                                className="mt-2"
                                                value={source}
                                                onChange={(e) => setSource(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 mt-3">
                                        <div>
                                            <label htmlFor="courseVideo">
                                                Chọn video: <UploadFileIcon/>
                                            </label>
                                            <input
                                                type="file"
                                                id="courseVideo"
                                                onChange={handleFileChange}
                                                accept="video/*"
                                                style={{display: "none"}}
                                            />
                                            {videoUrl && (
                                                <div>
                                                    <video
                                                        src={videoUrl}
                                                        controls
                                                        style={{
                                                            width: "300px",
                                                            marginTop: "10px",
                                                            overflow: "hidden",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="">
                                        <CKEditorComponent
                                            getValue={handleGetValue}
                                            oldValue={description}
                                        />
                                    </div>
                                </div>
                            </div>


                            <Divider/>
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
                                                document,
                                                videoFile,
                                                type: "edit",
                                            },
                                            onEnd
                                        );
                                    }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Spin/> : "Lưu"}
                                </Button>
                                <Button type="primary" danger onClick={() => setIsShowComment(true)} style={{color:"#333"}}>Quản lý bình luận<CommentOutlined style={{paddingRight:"6px"}}/></Button>
                                {isShowComment && <FormAddComment closeForm={closedComment} lessonId={editLesson?.id} isAdmin={true}/>}
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <div className="overlay" onClick={handleClickOutside}>
                        <form
                            ref={formRef}
                            className="fade-down bg-white w-[77%] px-[24px] py-[20px] rounded"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-[20px] font-semibold">Thêm mới bài học</h3>
                                <CloseIcon
                                    onClick={closeForm}
                                    className="cursor-pointer hover:text-gray-500"
                                />
                            </div>

                            <div className="flex"
                            >
                                <div className="w-11/12 pr-5">
                                    <div className="grid grid-cols-1 gap-5 mt-3">
                                        <div>
                                            <label htmlFor="">Tên bài học</label>
                                            <Input
                                                className="mt-2"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 mt-3">
                                        <div>
                                            <label htmlFor="">Tài Liệu</label>
                                            <Input
                                                className="mt-2"
                                                value={document}
                                                onChange={(e) => setDocument(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 mt-3">
                                        <div>
                                            <label htmlFor="">Link tài nguyên</label>
                                            <Input
                                                className="mt-2"
                                                value={source}
                                                onChange={(e) => setSource(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 mt-3">
                                        <div>
                                            <label htmlFor="courseVideo">
                                                Chọn video: <UploadFileIcon/>
                                            </label>
                                            <input
                                                type="file"
                                                id="courseVideo"
                                                onChange={handleFileChange}
                                                accept="video/*"
                                                style={{display: "none"}}
                                            />
                                            {videoUrl && (
                                                <div>
                                                    <video
                                                        src={videoUrl}
                                                        controls
                                                        style={{
                                                            width: "300px",
                                                            marginTop: "10px",
                                                            overflow: "hidden",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="">
                                        <CKEditorComponent
                                            getValue={handleGetValue}
                                            oldValue={description}
                                        />
                                    </div>
                                </div>

                            </div>


                            <Divider/>
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
                                                document,
                                                videoFile,
                                                type: editLesson ? "edit" : "add",
                                            },
                                            onEnd
                                        );
                                    }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Spin/> : "Lưu"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}
