import React, { useState } from 'react';
import { List, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import ListItem from '../../../components/Client/List/NewItem.jsx';

const { Title, Text } = Typography;

export default function ListBlog() {
  const [newsData] = useState([
    {
      idBaiViet: 1,
      tieuDe: "Chủ tịch xã cầm đầu đường dây buôn ma túy xuyên quốc gia",
      noiDung: "Lãnh đạo xã Na Ngoi cho biết, đang làm tờ trình xin ý kiến của UBND huyện Kỳ Sơn để cử người điều hành công việc thay chủ tịch xã vừa bị bắt. Theo vị này, quá trình công tác ông Vừ thường thể hiện là một cán bộ có năng lực, bản lĩnh, trách nhiệm, luôn hoàn thành tốt mọi nhiệm vụ, không để lộ các dấu hiệu bất minh.",
      author: "Author 1",
      ngayDang: "2025-01-01",
      hinhAnh: "https://via.placeholder.com/150",
      slug: "contact"
    },
    {
      idBaiViet: 2,
      tieuDe: "News Title 2",
      noiDung: "<h1>This is the content of the second news.</h1>",
      author: "Author 2",
      ngayDang: "2025-01-02",
      hinhAnh: "https://via.placeholder.com/150",
      link: "https://example.com/news/2"
    },
  ]);

  return (
    <div >
      <h2>Tin Tức</h2>
      <ListItem data={newsData}/>
    </div>
  );
}
