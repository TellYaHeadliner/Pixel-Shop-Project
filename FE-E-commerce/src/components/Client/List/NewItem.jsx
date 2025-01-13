import React, { useEffect } from 'react';
import { List, message, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import EditorComponent from '../../../components/Client/Ckeditor/CkeditorBox.jsx';
import {  useNavigate } from 'react-router-dom';
import '../List/NewItem.scss';
const { Text } = Typography;

export default function NewsItem({ data }) {
  const navigate = useNavigate();
  function removeHtmlTags(str) {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }
  const handleClicks=(value)=>{
      navigate('/blog/' + value.slug);
  }
  return (
    <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
        <List.Item className='onclick'
        onClick={() => handleClicks(item)}
          key={item.idBaiViet}
          style={{ display: 'flex',backgroundColor:'darkGray'}} 
        >
            <img
              width='13%'
              alt="logo"
              height='13%'
              src={"http://127.0.0.1:8000/imgs/"+item.hinhAnh}
              style={{minWidth:'96px', minHeight:'96px',objectFit: 'cover'}}
             
            />
            <div style={{ flex: 1, marginLeft:'2%'}} >
                  <Text><h4>{item.tieuDe.slice(0, 100)}</h4></Text>
                  <p>{`${removeHtmlTags(item.noiDung).slice(0, 350)}...`}</p>
                  <div style={{}}>  
                    <p>{item.ngayDang}</p>
                  </div>
            </div>
          </List.Item>
        )}
      />
  );

}
