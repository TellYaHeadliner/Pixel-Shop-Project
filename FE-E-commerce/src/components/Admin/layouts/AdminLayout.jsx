import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import "./AdminLayout.scss"; // Đảm bảo import CSS
import Sidebar from '../Sidebar/Sidebar';
import WebsiteInfo from '../WebsiteInfo/WebsiteInfo';
import SupplierManagement from '../SupplierManagement/SupplierManagement';
import CategoryManagement from '../CategoryManagement/CategoryManagement';
import ProductManagement from '../ProductManagement/ProductManagement';
import BatchManagement from '../BatchManagement/BatchManagement';
import CommentManagement from '../CommentManagement/CommentManagement';
import AudienceStatistics from '../AudienceStatistics/AudienceStatistics';
import OrderStatistics from '../OrderStatistics/OrderStatistics';
import Contact from '../Contact/Contact';

const { Content, Sider } = Layout;

export default function AdminLayout() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={300} className="sidebar">
                <Sidebar />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{ margin: 0, minHeight: 280 }}>
                    <Routes>
                        <Route path="/" element={<WebsiteInfo />} /> {/* Route mặc định */}
                        <Route path="suppliers" element={<SupplierManagement />} />
                        <Route path="suppliers" element={<SupplierManagement />} />
                        <Route path="categories" element={<CategoryManagement />} />
                        <Route path="products" element={<ProductManagement />} />
                        <Route path="batches" element={<BatchManagement />} />
                        <Route path="comments" element={<CommentManagement />} />
                        <Route path="audience-statistics" element={<AudienceStatistics />} />
                        <Route path="order-statistics" element={<OrderStatistics />} />
                        <Route path="contact" element={<Contact />} /> 
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}