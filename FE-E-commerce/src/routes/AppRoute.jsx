import { Routes, Route } from "react-router-dom";

import ClientLayout from "../components/Client/layouts/ClientLayout";
import Home from "../pages/Client/Home";
import AdminLayout from "../components/Admin/layouts/AdminLayout";
import WebsiteInfo from "../pages/Admin/WebsiteInfo/WebsiteInfo";
import SupplierManagement from "../pages/Admin/SupplierManagement/SupplierManagement";
import CategoryManagement from "../pages/Admin/CategoryManagement/CategoryManagement";
import ProductManagement from "../pages/Admin/ProductManagement/ProductManagement";
import ProductManagementAdd from "../pages/Admin/ProductManagement/ProductManagementAdd";
import BatchManagement from "../pages/Admin/BatchManagement/BatchManagement";
import CommentManagement from "../pages/Admin/CommentManagement/CommentManagement";
import AudienceStatistics from "../pages/Admin/AudienceStatistics/AudienceStatistics";
import OrderStatistics from "../pages/Admin/OrderStatistics/OrderStatistics";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<WebsiteInfo />} /> 
        <Route path="suppliers" element={<SupplierManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
				<Route path="products">
					<Route index element={<ProductManagement />} />
					<Route path="add" element={<ProductManagementAdd />} />
				</Route>
        <Route path="batches" element={<BatchManagement />} />
        <Route path="comments" element={<CommentManagement />} />
        <Route path="audience-statistics" element={<AudienceStatistics />} />
        <Route path="order-statistics" element={<OrderStatistics />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;