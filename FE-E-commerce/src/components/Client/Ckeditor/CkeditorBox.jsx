import React, { useState } from "react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

export default function CkeditorBox({content}) {
    return(
        <div
            style={{ border: "1px solid #ccc", padding: "10px" }}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}