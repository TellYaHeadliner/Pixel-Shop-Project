
import BarChart from "../Charts/BarChart";

import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";
import TableDoiTuong from "../Table/TableDoiTuong";

import React from 'react';
import { Card, Row, Col } from 'antd';
import { Bar } from '@ant-design/charts';


const AudienceStatistics = () => {
    const data = [
        {
            type: 'Sản phẩm được thêm',
            value: 120,
        },
        {
            type: 'Sản phẩm được bán',
            value: 90,
        },
        {
            type: 'Số tài khoản',
            value: 200,
        },
        {
            type: 'Bài viết',
            value: 30,
        },
        {
            type: 'Sản phẩm bị mất',
            value: 10,
        },
    ];

    const config = {
        data,
        xField: 'type',
        yField: 'value',
        label: {
            position: 'bottom', // 'top', 'bottom', 'middle'
            style: {
                fill: '#FFFFFF', // Màu chữ
                opacity: 0.6, // Độ mờ
            },
        },
        meta: {
            type: { alias: 'Thống kê' },
            value: { alias: 'Số lượng' },
        },
    };

    return (
        <div>
            <PieChart />
            <BarChart />
            <LineChart />
            <TableDoiTuong />
        </div>
    );
};

export default AudienceStatistics;