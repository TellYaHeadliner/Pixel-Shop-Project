import { Table } from "antd";

const staticData = [
  {
    key: "1",
    hoTen: "Nguyễn Văn A",
    soDienThoai: "0913661977",
    tieuDe: "Cho tôi hỏi là cái này nó....",
  },
  {
    key: "2",
    hoTen: "Nguyễn Văn B",
    soDienThoai: "0913661977",
    tieuDe: "Cho tôi hỏi là cái này nó....",
  },
  {
    key: "1",
    hoTen: "Nguyễn Văn C",
    soDienThoai: "0913661977",
    tieuDe: "Cho tôi hỏi là cái này nó....",
  },
];

const columns = [
    {
        title: 'Họ tên',
        dataIndex: 'hoTen',
        key: 'hoTen',
    },
    {
        title: 'Số điện thoại',
        dataIndex:'soDienThoai',
        key:'soDienThoai',
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'tieuDe',
        key: 'tieuDe',
    }
]

const TableLienHe = () => {
    return (
        <Table columns={columns} dataSource={staticData} />
    )
}

export default TableLienHe;