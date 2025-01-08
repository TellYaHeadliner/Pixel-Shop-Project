import { Table } from "antd"
import Star from "../Descriptions/Star";

const columns = [
    {
        title: 'Tên người bình luận',
        dataIndex: 'hoTen',
        key: 'hoTen',
    },
    {
        title: "Số sao",
        dataIndex: "soSao",
        key: 'soSao',
        render: (rating) => <Star rating={rating} />
    },
    {
        title: "Nội dung bình luận",
        dataIndex: 'noiDung',
        key: 'noiDung',
    }
];

const dataSource = [
  {
    key: "1",
    hoTen: "An",
    noiDung: "Bình luận rất tốt!",
    soSao: 5,
  },
  {
    key: "2",
    hoTen: "Bé",
    noiDung: "Hài lòng với sản phẩm.",
    soSao: 4,
  },
  {
    key: "3",
    hoTen: "Cô",
    noiDung: "Sản phẩm thiết kế tuyệt vời!",
    soSao: 3,
  }
];

const TableComment = () => {
    return (
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5}} />
    )
}

export default TableComment;