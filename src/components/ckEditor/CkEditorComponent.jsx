import React, { memo, useEffect, useState } from "react";
import "https://cdn.ckeditor.com/ckeditor5/41.2.0/super-build/ckeditor.js";
import "./index.css";
import Cookies from "js-cookie";
import axios from "axios";
import "highlight.js/styles/github.css";
function CKEditorComponent({ getValue, oldValue }) {
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
          "exportPDF",
          "exportWord",
          "|",
          "findAndReplace",
          "selectAll",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "strikethrough",
          "underline",
          "code",
          "subscript",
          "superscript",
          "removeFormat",
          "|",
          "bulletedList",
          "numberedList",
          "todoList",
          "|",
          "outdent",
          "indent",
          "|",
          "undo",
          "redo",
          "-",
          "fontSize",
          "fontFamily",
          "fontColor",
          "fontBackgroundColor",
          "highlight",
          "|",
          "alignment",
          "|",
          "link",
          "uploadImage",
          "blockQuote",
          "insertTable",
          "mediaEmbed",
          "codeBlock",
          "htmlEmbed",
          "|",
          "specialCharacters",
          "horizontalLine",
          "pageBreak",
          "|",
          "textPartLanguage",
          "|",
          "sourceEditing",
        ],
        shouldNotGroupWhenFull: true,
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true,
        },
      },
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading1",
            view: "h1",
            title: "Heading 1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Heading 2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h3",
            title: "Heading 3",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4",
            view: "h4",
            title: "Heading 4",
            class: "ck-heading_heading4",
          },
          {
            model: "heading5",
            view: "h5",
            title: "Heading 5",
            class: "ck-heading_heading5",
          },
          {
            model: "heading6",
            view: "h6",
            title: "Heading 6",
            class: "ck-heading_heading6",
          },
        ],
      },
      placeholder: "Nhập nội dung văn bản",
      fontFamily: {
        options: [
          "default",
          "Arial, Helvetica, sans-serif",
          "Courier New, Courier, monospace",
          "Georgia, serif",
          "Lucida Sans Unicode, Lucida Grande, sans-serif",
          "Tahoma, Geneva, sans-serif",
          "Times New Roman, Times, serif",
          "Trebuchet MS, Helvetica, sans-serif",
          "Verdana, Geneva, sans-serif",
        ],
        supportAllValues: true,
      },
      fontSize: {
        options: [10, 12, 14, "default", 18, 20, 22],
        supportAllValues: true,
      },
      htmlSupport: {
        allow: [
          {
            name: /.*/,
            attributes: true,
            classes: true,
            styles: true,
          },
        ],
      },
      htmlEmbed: {
        showPreviews: true,
      },
      link: {
        decorators: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          toggleDownloadable: {
            mode: "manual",
            label: "Downloadable",
            attributes: {
              download: "file",
            },
          },
        },
      },
      mention: {
        feeds: [
          {
            marker: "@",
            feed: [
              "@apple",
              "@bears",
              "@brownie",
              "@cake",
              "@cake",
              "@candy",
              "@canes",
              "@chocolate",
              "@cookie",
              "@cotton",
              "@cream",
              "@cupcake",
              "@danish",
              "@donut",
              "@dragée",
              "@fruitcake",
              "@gingerbread",
              "@gummi",
              "@ice",
              "@jelly-o",
              "@liquorice",
              "@macaroon",
              "@marzipan",
              "@oat",
              "@pie",
              "@plum",
              "@pudding",
              "@sesame",
              "@snaps",
              "@soufflé",
              "@sugar",
              "@sweet",
              "@topping",
              "@wafer",
            ],
            minimumCharacters: 1,
          },
        ],
      },
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
    <div
      style={{
        color: "black !important",
      }}
    >
      <div id="editor" ref={(ref) => setEditor(ref)}></div>
    </div>
  );
}
export default memo(CKEditorComponent);
