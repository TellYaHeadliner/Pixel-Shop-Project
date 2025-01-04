import React from 'react';
import { Layout } from 'antd';
import { Routes, Route, Outlet } from 'react-router-dom';
import "./AdminLayout.scss"; // Đảm bảo import CSS
import Sidebar from '../Sidebar/Sidebar';
import WebsiteInfo from '../../../pages/Admin/WebsiteInfo/WebsiteInfo';
import SupplierManagement from '../../../pages/Admin/SupplierManagement/SupplierManagement';
import CategoryManagement from '../../../pages/Admin/CategoryManagement/CategoryManagement';
import ProductManagement from '../../../pages/Admin/ProductManagement/ProductManagement';
import BatchManagement from '../../../pages/Admin/BatchManagement/BatchManagement';
import CommentManagement from '../../../pages/Admin/CommentManagement/CommentManagement';
import AudienceStatistics from '../../../pages/Admin/AudienceStatistics/AudienceStatistics';
import OrderStatistics from '../../../pages/Admin/OrderStatistics/OrderStatistics';

const { Content, Sider } = Layout;


export default function AdminLayout() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={300} className="sidebar">
                <Sidebar />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{ margin: 0, minHeight: 280 }}>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
}