import React, { memo, useEffect, useState } from "react";
import "https://cdn.ckeditor.com/ckeditor5/41.2.0/super-build/ckeditor.js";
import "./indexComment.css";
import Cookies from "js-cookie";
import axios from "axios";
import "highlight.js/styles/github.css";

function CKEditorComment({ getValue, oldValue, className }) {
    const [editor, setEditor] = useState(null);
    const [value, setValue] = useState("");
    const getAuthToken = () => Cookies.get("accessToken");

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    loader.file.then((file) => {
                        const token = getAuthToken();

                        const formData = new FormData();
                        formData.append("file", file);
                        axios
                            .post(
                                `${import.meta.env.VITE_API_URL}/api/v1/file/upload-file`,
                                formData,
                                {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            )
                            .then((response) => {
                                console.log(response);
                                resolve({
                                    default: response.data,
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                                reject(error);
                            });
                    });
                });
            },
        };
    }

    function uploadPlugins(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    useEffect(() => {
        let editorInstance = null;

        // Khởi tạo CKEditor
        CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
            // Cấu hình CKEditor
            toolbar: {
                items: [
                    "bold",
                    "italic",
                    "blockquote",
                    "code",
                    "codeBlock",
                    "uploadImage",
                    "link",
                    "unlink",
                ],
                shouldNotGroupWhenFull: true,
            },
            placeholder: "Nhập bình luận mới của bạn",
            // Các cấu hình khác
            removePlugins: [
                "AIAssistant",
                "CKBox",
                "CKFinder",
                "EasyImage",
                "RealTimeCollaborativeComments",
                "RealTimeCollaborativeTrackChanges",
                "RealTimeCollaborativeRevisionHistory",
                "PresenceList",
                "Comments",
                "TrackChanges",
                "TrackChangesData",
                "RevisionHistory",
                "Pagination",
                "WProofreader",
                "MathType",
                "SlashCommand",
                "Template",
                "DocumentOutline",
                "FormatPainter",
                "TableOfContents",
                "PasteFromOfficeEnhanced",
                "CaseChange",
            ],
        }).then((instance) => {
            // Lưu tham chiếu của editor
            editorInstance = instance;
            if (oldValue) {
                instance.setData(oldValue);
            }
            // Gán giá trị hiện tại của editor vào state
            setValue(editorInstance.getData());
            // Lắng nghe sự kiện thay đổi và cập nhật giá trị vào state
            editorInstance.model.document.on("change:data", () => {
                setValue(editorInstance.getData());
                getValue(editorInstance.getData());
            });
            // Lưu tham chiếu của editor vào state
            setEditor(editorInstance);
            uploadPlugins(editorInstance);
        });

        // Cleanup
        return () => {
            if (editorInstance) {
                editorInstance.destroy();
            }
        };
    }, []);

    return (
        <div className={`editor-wrapper ${className}`}>
            <div id="editor" ref={(ref) => setEditor(ref)}></div>
        </div>
    );
}

export default memo(CKEditorComment);
