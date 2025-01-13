import React, {useEffect, useState }from 'react';
import MyEditor from '../../../components/Client/Ckeditor/CkeditorBox.jsx';
import { message } from 'antd';
import axios from "axios";
import { format } from "date-fns";

export default function ProfileCompanyInformation(){
    const [data,setData] = useState({});
    const  [date,setDate] = useState(null);
    const handleGetBV = async ()=>{
        try{
            const response = await axios.post(
                "http://127.0.0.1:8000/api/getBaiViet",
                {slug:'about'},
                {headers: {'Content-Type': 'application/json"'}}
            )
            setData(response.data.data);
            console.log(response.data.data.ngayDang);
            setDate(format(new Date(response.data.data.ngayDang), "dd-MM-yyyy"));
        }catch(e){
            message.error(e.response.data.message);
        }
    }
    useEffect(()=>{
        handleGetBV();
    },[]);
    return(
        <div>
            <div  className='d-flex flex-column align-items-center'>
                <img src={"http://127.0.0.1:8000/imgs/"+data.hinhAnh}
                style={{maxWidth:'2000px',maxHeight:'200px'}}/>
              </div>
            <h1>{data.tieuDe}</h1>
            <MyEditor
                content={data.noiDung}
            />
            <p>Đăng ngày: {date}</p>
        </div>
    );
}
