import React, { useState } from "react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

// Hàm loại bỏ thẻ HTML

export default function CkeditorBox({ content }) {
  return (
    <div style={{ marginLeft: "2%" }}>
      {/* Chỉ hiển thị nội dung đã loại bỏ thẻ HTML */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
