import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import HeaderClient from "../Header/ClientHeader";
import FooterClient from "../Footer/FooterClient";

const { Header, Content, Footer } = Layout;

export default function ClientLayout() {
  return (
  <Layout style={{ minHeight: "100vh"}}>
    <HeaderClient />

    <Content style={{ flexGrow: 1, padđing: "16px"}}>
      <Outlet />
    </Content>

    <Footer style={{ marginTop: "16px" }}>
      <FooterClient />
    </Footer>
  </Layout>
  );
}
