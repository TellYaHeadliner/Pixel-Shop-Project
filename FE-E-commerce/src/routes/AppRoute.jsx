import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";


import ProfileLayout from "../components/Client/layouts/ProfileLayout";
import ProfileInformation from "../pages/Client/ProfileInformation";
import ProfileLocation from "../pages/Client/ProfileLocation";
import ProfileChangePassWord from "../pages/Client/ProfileChangePassWord";
import ProfileCompanyInformation from "../pages/Client/ProfileCompanyInformation";
import ProfileProductloved from "../pages/Client/ProfileProductloved";

const ClientLayout = lazy(() => import("../components/Client/Layouts/ClientLayout"));
const Home = lazy(() => import("../pages/Client/Home/Home"));
const DetailProduct = lazy(() => import("../pages/Client/DetailProduct"));

const AdminLayout = lazy(() => import("../components/Admin/Layouts/AdminLayout"));
const SupplierManagement = lazy(() => import("../pages/Admin/SupplierManagement/SupplierManagement"));
const CategoryManagement = lazy(() => import("../pages/Admin/CategoryManagement/CategoryManagement"));
const ProductManagement = lazy(() => import("../pages/Admin/ProductManagement/ProductManagement"));
const BatchManagement = lazy(() => import("../pages/Admin/BatchManagement/BatchManagement"));
const CommentManagement = lazy(() => import("../pages/Admin/CommentManagement/CommentManagement"));
const AudienceStatistics = lazy(() => import("../pages/Admin/AudienceStatistics/AudienceStatistics"));
const OrderStatistics = lazy(() => import("../pages/Admin/OrderStatistics/OrderStatistics"));
const Contact = lazy(() => import("../pages/Admin/Contact/Contact"));
const WebsiteInfo = lazy(() => import("../pages/Admin/WebsiteInfo/WebsiteInfo"));
const BusinessStatistics = lazy(() => import("../pages/Admin/BusinessStatistics/BusinessStatistics"));

const StaffLayout = lazy(() => import("../components/Staff/Layouts/StafffLayout"));
const StaffContact = lazy(() => import("../pages/Staff/Contact/Contact"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<ProfileLayout/>}>
          <Route index element={<ProfileInformation/>}/>
          <Route path="locations" element={<ProfileLocation/>}/>
          <Route path="changepassword" element={<ProfileChangePassWord/>}/>
          <Route path="productloved" element={<ProfileProductloved/>}/>

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
        <Route path="business-statistics" element={<BusinessStatistics />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;