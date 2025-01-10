import React from 'react';
import MyEditor from '../../../components/Client/Ckeditor/CkeditorBox.jsx';
import { DatePicker } from 'antd';

export default function ProfileCompanyInformation(){
    const data="Chào mừng đến với Pixel – Địa chỉ uy tín hàng đầu trong lĩnh vực cung cấp laptop và điện thoại!";
    return(
        <div>
            <div  className='d-flex flex-column align-items-center'>
                <img src='https://tse1.mm.bing.net/th?id=OIP.1gPe4Dn1CkhhUc4BMIQEHgHaDt&pid=Api&P=0&h=180'
                style={{maxWidth:'2000px',maxHeight:'200px'}}/>
              </div>
            <h1>Tiêu đề</h1>
            <MyEditor
                content={data}
            />
            <p>10/1/2025</p>
        </div>
    );
}
