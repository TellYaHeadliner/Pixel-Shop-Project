import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

//client management
const ClientLayout = lazy(() => import("../components/Client/Layouts/ClientLayout"));
const Home = lazy(() => import("../pages/Client/Home/Home"));
const DetailProduct = lazy(() => import("../pages/Client/DetailProduct"));
const Payment = lazy(() => import("../pages/Client/Payment/Payment"));
const ShoppingCart = lazy(() => import("../pages/Client/ShoppingCart/ShoppingCart"));

//admin management
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

//staff management
const StaffLayout = lazy(() => import("../components/Staff/Layouts/StafffLayout"));
const StaffContact = lazy(() => import("../pages/Staff/Contact/Contact"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="/product" element={<DetailProduct />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
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
    </Suspense>
  );
};

export default AppRoutes;