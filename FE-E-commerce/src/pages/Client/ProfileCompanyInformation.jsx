import React from 'react';
import MyEditor from '../../components/Client/Ckeditor/CkeditorBox';

export default function ProfileCompanyInformation(){
    const data="<h2>Chào mừng đến với Pixel – Địa chỉ uy tín hàng đầu trong lĩnh vực cung cấp laptop và điện thoại!</h2>";
    return(
        <div>
            <MyEditor
                content={data}
            />
        </div>
    );
}
