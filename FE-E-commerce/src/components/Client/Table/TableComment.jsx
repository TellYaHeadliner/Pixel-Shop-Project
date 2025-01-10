import { Table } from "antd"
import Star from "../Descriptions/Star";

const columns = [
    {
        title: 'Tên người bình luận',
        dataIndex: 'tenDangNhap',
        key: 'tenDangNhap',
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

const TableComment = ({ rating }) => {
    return (
        <Table dataSource={rating} columns={columns} pagination={{ pageSize: 5}} />
    )
}

export default TableComment;