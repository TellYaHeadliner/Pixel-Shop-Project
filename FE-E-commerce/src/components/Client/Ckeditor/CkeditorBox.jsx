import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function EditorComponent({ content, onChange }) {
  return (
    <div
            dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
