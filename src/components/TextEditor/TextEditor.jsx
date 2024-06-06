import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";

const TextEditor = ({ updateDescription, value }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(value);
  }, [value]);

  useEffect(() => {
    updateDescription(content);
  }, [content]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }, { size: [] }, { font: [] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "align",
    "color",
    "background",
    "script",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <ReactQuill
        id="react-quill"
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        placeholder="Write your blog..."
      />
    </div>
  );
};

export default TextEditor;
