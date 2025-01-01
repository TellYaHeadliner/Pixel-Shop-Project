import { Table } from "antd";

const dataSource = [
  {
    key: "1",
    tenDoiTuong: "Thông số sản phẩm",
    soLuong: 32,
  },
  {
    key: "2",
    tenDoiTuong: "Sản phẩm",
    soLuong: 32,
  },
];

const columns = [
  {
    title: "Tên đối tượng",
    dataIndex: "tenDoiTuong",
    key: "tenDoiTuong",
  },
  {
    title: "Số lượng",
    dataIndex: "soLuong",
    key: "soLuong",
  },
];

const TableDoiTuong = () => {
  return (
    <Table dataSource={dataSource} columns={columns} style={{ width: "fit-content"}}/>
  )
}

export default TableDoiTuong;
