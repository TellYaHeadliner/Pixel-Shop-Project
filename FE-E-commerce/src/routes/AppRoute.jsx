import { Routes, Route } from "react-router-dom";

import ClientLayout from "../components/Client/Layouts/ClientLayout";
import Home from "../pages/Client/Home/Home";

import AdminLayout from "../components/Admin/layouts/AdminLayout";
import ProfileLayout from "../components/Client/layouts/ProfileLayout";
import ProfileInformation from "../pages/Client/ProfileInformation";
import ProfileLocation from "../pages/Client/ProfileLocation";
import ProfileChangePassWord from "../pages/Client/ProfileChangePassWord";
import ProfileCompanyInformation from "../pages/Client/ProfileCompanyInformation";
import DetailProduct from "../pages/Client/DetailProduct"
import SupplierManagement from "../pages/Admin/SupplierManagement/SupplierManagement";
import CategoryManagement from "../pages/Admin/CategoryManagement/CategoryManagement";
import ProductManagement from "../pages/Admin/ProductManagement/ProductManagement";
import BatchManagement from "../pages/Admin/BatchManagement/BatchManagement";
import CommentManagement from "../pages/Admin/CommentManagement/CommentManagement";
import AudienceStatistics from "../pages/Admin/AudienceStatistics/AudienceStatistics";
import OrderStatistics from "../pages/Admin/OrderStatistics/OrderStatistics";
import Contact from "../pages/Admin/Contact/Contact";
import WebsiteInfo from "../pages/Admin/WebsiteInfo/WebsiteInfo";

import StaffLayout from "../components/Staff/Layouts/StafffLayout";
import StaffContact from "../pages/Staff/Contact/Contact";
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
      <Route path="/staff" element={<StaffLayout />}>
        <Route index element={<StaffContact />} />
        {/* <Route path="orders" element={<StaffContact />} />
        <Route path="customer_consulting" element={<StaffContact />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
