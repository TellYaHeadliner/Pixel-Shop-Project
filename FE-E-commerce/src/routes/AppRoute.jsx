import { Routes, Route } from "react-router-dom";

import ClientLayout from "../components/Client/Layouts/ClientLayout";
import Home from "../pages/Client/Home/Home";
import AdminLayout from "../components/Admin/layouts/AdminLayout";
import WebsiteInfo from "../components/Admin/WebsiteInfo/WebsiteInfo";
import SupplierManagement from "../components/Admin/SupplierManagement/SupplierManagement";
import CategoryManagement from "../components/Admin/CategoryManagement/CategoryManagement";
import ProductManagement from "../components/Admin/ProductManagement/ProductManagement";
import BatchManagement from "../components/Admin/BatchManagement/BatchManagement";
import CommentManagement from "../components/Admin/CommentManagement/CommentManagement";
import AudienceStatistics from "../components/Admin/AudienceStatistics/AudienceStatistics";
import OrderStatistics from "../components/Admin/OrderStatistics/OrderStatistics";
import ProfileLayout from "../components/Client/layouts/ProfileLayout";
import ProfileInformation from "../pages/Client/ProfileInformation";
import ProfileLocation from "../pages/Client/ProfileLocation";
import ProfileChangePassWord from "../pages/Client/ProfileChangePassWord";
import ProfileCompanyInformation from "../pages/Client/ProfileCompanyInformation";
import Contact from "../components/Admin/Contact/Contact";
import DetailProduct from "../pages/Client/DetailProduct"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<ProfileLayout/>}>
          <Route index element={<ProfileInformation/>}/>
          <Route path="locations" element={<ProfileLocation/>}/>
          <Route path="changepassword" element={<ProfileChangePassWord/>}/>
        </Route>
        <Route path="/about" element={<ProfileCompanyInformation/>}/>
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
      </Route>
    </Routes>
  );
};

export default AppRoutes;