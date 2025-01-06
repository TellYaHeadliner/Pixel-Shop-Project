import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function EditorComponent({ content, onChange }) {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    onChange(data);
  };
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={handleEditorChange}
      />
    </div>
  );
}
