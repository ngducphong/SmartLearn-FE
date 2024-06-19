import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Input } from "antd";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import { addNewComment, getCommentChildrenByParentId, listCommentByLesson } from "../../api/commentAPIs.js";
import CKEditorComment from "../ckEditor/CkEditorComment.jsx";
import { UserOutlined } from "@ant-design/icons";
import DateCommponent from "../date/DateCommponent.jsx";

export default function FormAddComment({ closeForm, lessonId }) {
    const [commentList, setCommentList] = useState([]);
    const formRef = useRef(null);
    const [content, setContent] = useState("");
    const [contentChild, setContentChild] = useState("");
    const [childComments, setChildComments] = useState({});

    const handleGetComment = async () => {
        const data = await listCommentByLesson(lessonId);
        setCommentList(data);
    };

    const handleGetValue = (value) => {
        setContent(value);
    };

    const handleClickSendComment = async () => {
        const infoComment = {
            content: content,
            lessonId: lessonId,
        };
        const commentNew = await addNewComment(infoComment);
        setCommentList([commentNew, ...commentList]);
        setContent(""); // Xóa nội dung sau khi gửi bình luận
    };

    const handleGetListChildComment = async (parentId) => {
        const getListComment = await getCommentChildrenByParentId(parentId);
        setChildComments((prev) => ({
            ...prev,
            [parentId]: getListComment,
        }));
    };

    const handleClickRespond = (replyBoxId) => {
        const replyBox = document.getElementById(replyBoxId);
        setContentChild("");
        if (replyBox.style.display === "block") {
            replyBox.style.display = "none";
        } else {
            replyBox.style.display = "block";
        }
    };

    const handleGetCommentChild = (replyBoxId, parentId) => {
        const replyBox = document.getElementById(replyBoxId);
        setContentChild("");
        if (replyBox.style.display === "block") {
            replyBox.style.display = "none";
        } else {
            handleGetListChildComment(parentId);
            replyBox.style.display = "block";
        }
    };

    const handleClickSendCommentChild = async (commentId) => {
        const infoComment = {
            content: contentChild,
            lessonId: lessonId,
            commentId: commentId,
        };
        const commentNew = await addNewComment(infoComment);
        setChildComments((prev) => ({
            ...prev,
            [commentId]: [commentNew, ...(prev[commentId] || [])],
        }));

        // Cập nhật số lượng bình luận con trong trạng thái commentList
        setCommentList((prev) =>
            prev.map((comment) =>
                comment.id === commentId
                    ? { ...comment, totalCommentChild: comment.totalCommentChild + 1 }
                    : comment
            )
        );

        setContentChild(""); // Xóa nội dung sau khi gửi bình luận con
    };

    useEffect(() => {
        handleGetComment();
    }, [lessonId]);

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            closeForm(); // Đóng form nếu click bên ngoài form
        }
    };

    return (
        <div className="overlay" onClick={handleClickOutside}>
            <form
                ref={formRef}
                className="fade-down bg-white w-[70%] px-[24px] py-[20px] rounded scrollable-content"
            >
                <div className="flex justify-between items-center" style={{ justifyContent: "flex-end" }}>
                    <CloseIcon
                        onClick={closeForm}
                        style={{ color: "#22100d", position: "fixed" }}
                        className="cursor-pointer hover:text-gray-500"
                    />
                </div>

                <div>
                    <div className="" style={{ color: "#22100d" }}>
                        <CKEditorComment getValue={handleGetValue} />
                        {content && (
                            <Button
                                onClick={handleClickSendComment}
                                style={{
                                    left: "970px",
                                    background: "#4b54be",
                                    width: "160px",
                                    color: "white",
                                }}
                            >
                                Bình Luận
                            </Button>
                        )}
                    </div>

                    {commentList.map((comment, index) => (
                        <div key={index} style={{ padding: "10px" }}>
                            <div
                                className="fade-down bg-white w-[100%] px-[24px] py-[20px] rounded "
                                style={{ textAlign: "left", color: "#333" }}
                            >
                                <div>
                                    <div style={{ display: "flex" }}>
                                        <UserOutlined
                                            style={{
                                                marginBottom: "16px",
                                                paddingRight: "5px",
                                                fontSize: "25px",
                                            }}
                                        />
                                        <p
                                            style={{
                                                paddingRight: "10px",
                                                color: "#0093fc",
                                                fontSize: "17px",
                                            }}
                                        >
                                            {comment?.users?.fullName}
                                        </p>
                                    </div>
                                    <p style={{ color: "#808b9a", fontSize: "12px" }}>
                                        <DateCommponent inputDate={comment.createDate} />
                                    </p>
                                </div>

                                <div
                                    className="ckEditor"
                                    dangerouslySetInnerHTML={{
                                        __html: comment.content,
                                    }}
                                />
                                <div>
                                    <Button
                                        type="link"
                                        style={{ marginTop: "15px" }}
                                        onClick={() => handleClickRespond(comment.id)}
                                    >
                                        Phản hồi
                                    </Button>
                                    {comment.totalCommentChild !== 0 && (
                                        <Button
                                            type="link"
                                            style={{ marginTop: "15px", color: "#808b9a" }}
                                            onClick={() =>
                                                handleGetCommentChild("commentChild" + comment.id, comment.id)
                                            }
                                        >
                                            Xem {comment.totalCommentChild} câu trả lời
                                        </Button>
                                    )}
                                    <div
                                        className="fade-down replyBox rounded"
                                        id={comment.id}
                                        style={{ color: "#22100d" }}
                                    >
                                        <Input
                                            placeholder="Nhập phản hồi"
                                            value={contentChild}
                                            onChange={(e) => setContentChild(e.target.value)}
                                        />

                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <Button
                                                style={{
                                                    background: "#ffffff",
                                                    width: "160px",
                                                    margin: "10px 40px 0 0",
                                                }}
                                                onClick={() => handleClickRespond(comment.id)}
                                            >
                                                Huỷ
                                            </Button>
                                            <Button
                                                style={{
                                                    background: "#4b54be",
                                                    width: "160px",
                                                    margin: "10px 0 0 0",
                                                    color: "white",
                                                }}
                                                onClick={() => handleClickSendCommentChild(comment.id)}
                                            >
                                                Bình Luận
                                            </Button>
                                        </div>
                                    </div>

                                    <div
                                        className="fade-down replyBox rounded"
                                        id={"commentChild" + comment.id}
                                    >
                                        {childComments[comment.id]?.map((commentChild, index) => (
                                            <div key={index} style={{ padding: "15px", borderLeft: "1px solid #ccc"}}>
                                                <div>
                                                    <div style={{ display: "flex" }}>
                                                        <UserOutlined
                                                            style={{
                                                                marginBottom: "16px",
                                                                paddingRight: "5px",
                                                                fontSize: "25px",
                                                            }}
                                                        />
                                                        <p
                                                            style={{
                                                                paddingRight: "10px",
                                                                color: "#0093fc",
                                                                fontSize: "17px",
                                                            }}
                                                        >
                                                            {commentChild?.users?.fullName}
                                                        </p>
                                                    </div>
                                                    <p style={{ color: "#808b9a", fontSize: "12px" }}>
                                                        <DateCommponent inputDate={commentChild.createDate} />
                                                    </p>
                                                </div>

                                                <div
                                                    className="ckEditor"
                                                    dangerouslySetInnerHTML={{
                                                        __html: commentChild.content,
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}
