import React, { useEffect, useState } from 'react';
import { List, Typography, message } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import ListItem from '../../../components/Client/List/NewItem.jsx';
import axios from "axios"

const { Title, Text } = Typography;

export default function ListBlog() {
  const [newsData,setNewsData] = useState([]);

  const getListNews = async () => {
    try{
      const response = await axios.post(
        "http://127.0.0.1:8000/api/getListBaiViet",
        {},
        {
          headers: {'Content-type': 'application/json'}
        }
      )
      setNewsData(response.data.data);
    }catch(e){
      message.error(e.response.data.message);
    }
  };
  useEffect(()=>{getListNews()},[]);
  return (
    <div >
      <h2>Tin Tức</h2>
      <ListItem data={newsData}/>
    </div>
  );
}
