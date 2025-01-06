import { Routes, Route } from "react-router-dom";

import ClientLayout from "../components/Client/Layouts/ClientLayout";
import Home from "../pages/Client/Home/Home";
import DetailProduct from "../pages/Client/DetailProduct";

import AdminLayout from "../components//Admin/layouts/AdminLayout";
import SupplierManagement from "../pages/Admin/SupplierManagement/SupplierManagement";
import CategoryManagement from "../pages/Admin/CategoryManagement/CategoryManagement";
import ProductManagement from "../pages/Admin/ProductManagement/ProductManagement";
import BatchManagement from "../pages/Admin/BatchManagement/BatchManagement";
import CommentManagement from "../pages/Admin/CommentManagement/CommentManagement";
import AudienceStatistics from "../pages/Admin/AudienceStatistics/AudienceStatistics";
import OrderStatistics from "../pages/Admin/OrderStatistics/OrderStatistics";
import Contact from "../pages/Admin/Contact/Contact";
import WebsiteInfo from "../pages/Admin/WebsiteInfo/WebsiteInfo";
import BusinessStatistics from "../pages/Admin/BusinessStatistics/BusinessStatistics";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="/product" element={<DetailProduct />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<WebsiteInfo />} />
        <Route path="suppliers" element={<SupplierManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="batches" element={<BatchManagement />} />
        <Route path="comments" element={<CommentManagement />} />
        <Route path="audience-statistics" element={<AudienceStatistics />} />
        <Route path="order-statistics" element={<OrderStatistics />} />
        <Route path="contact" element={<Contact />} />
        <Route path="business-statistics" element={<BusinessStatistics />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
