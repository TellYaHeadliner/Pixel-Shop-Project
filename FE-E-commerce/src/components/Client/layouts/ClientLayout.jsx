import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderClient from "../Header/ClientHeader";
import FooterClient from "../Footer/FooterClient";
import "./ClientLayout.scss"
const { Content, Footer } = Layout;

export default function ClientLayout() {
  return (
    <Layout className="layout" >
      <HeaderClient />

      <Content style={{ padding: '20px',marginTop:"160px" }}>
        <Outlet />
      </Content>

      <Footer style={{ width: '100%', padding: '0' }}>
        <FooterClient />
      </Footer>
    </Layout>
  );
}