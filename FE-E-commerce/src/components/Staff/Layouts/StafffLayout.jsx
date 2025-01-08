import { Layout } from 'antd';


import {  Outlet } from 'react-router-dom';

import StaffSidebar from '../Sidebar/Sidebar';
import "./StaffLayout.scss"; // Đảm bảo import CSS
const { Content } = Layout;

export default function StaffLayout() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <StaffSidebar />
        <Layout style={{ marginLeft: "350px" }}>
          <Content style={{ margin: 0, minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
}