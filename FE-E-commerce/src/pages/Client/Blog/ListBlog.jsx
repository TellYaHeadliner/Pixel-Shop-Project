import React, { useEffect, useState } from 'react';
import { List, Typography, message, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import ListItem from '../../../components/Client/List/NewItem.jsx';
import axios from "axios";

const { Title, Text } = Typography;

export default function ListBlog() {
  const [newsData, setNewsData] = useState([]);
  const [count, setCount] = useState([]);
  const [pages, setPages] = useState(1);
  const [tempPage, setTempPage] = useState(1); 

  const getListNews = async (page = 1) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/getListBaiViet",
        { page },
        {
          headers: { 'Content-type': 'application/json' }
        }
      );
      setNewsData(response.data.data);
      setCount(Array.from({ length: Math.ceil(response.data.count / 3) }, (_, i) => i + 1));
    } catch (e) {
      message.error(e.response.data.message);
    }
  };

  useEffect(() => {
    getListNews(pages);
  }, [pages]);

  const handlePageChange = (newPage) => {
    setTempPage(newPage);
    setTimeout(() => {
      setPages(newPage);
    }, 300);
  };

  return (
    <div>
      <h2>Tin Tức</h2>
      <ListItem data={newsData} />

      {/* Phân trang */}
      <div className="d-flex justify-content-center w-100 mt-5">
        <nav>
          <Button
            disabled={pages === 1 || count.length === 1}
            onClick={() => handlePageChange(pages - 1)}
          >
            {"<"}
          </Button>
          {count.map((num) => (
            <Button
              key={num}
              onClick={() => handlePageChange(num)}
              style={{ marginLeft: "5px" }}
              type={tempPage === num ? "primary" : "default"}
            >
              {num}
            </Button>
          ))}
          <Button
            style={{ marginLeft: "5px" }}
            disabled={pages === count[count.length - 1] || count.length === 1}
            onClick={() => handlePageChange(pages + 1)}
          >
            {">"}
          </Button>
        </nav>
      </div>
    </div>
  );
}
