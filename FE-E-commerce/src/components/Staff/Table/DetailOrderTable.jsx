import { Table } from "antd"
import { useState } from "react"

const columns = [
    {
        title: 'STT',
        dataIndex: 'STT',
        key: 'STT',
    },
    {
        title: 'Hình ảnh sản phẩm',
        dataIndex: 'hinhanhSanPham',
        key: 'hinhanhSanPham',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'tenSanPham',
        key: 'tenSanPham',
    },
    {
        title: 'Giá sản phẩm',
        dataIndex: 'giaSanPham',
        key: 'giaSanPham',
    },
    {
        title: "Số lượng",
        dataIndex: 'soLuong',
        key: 'soLuong',
    }
]

const DetailOrderTable = ({ detailData }) => {
    return (
        <Table
            rowKey='id'
            columns={columns}
            dataSource={detailData}
        />
    );
}

export default DetailOrderTable;