// src/AppRoutes.jsx
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute




const ListBlog = lazy(()=>import ("../pages/Client/Blog/ListBlog"));
const ProfileRatedProducts = lazy(()=>import ("../pages/Client/Profile/ProfileRatedProduct"));
const ClientLayout = lazy(() => import("../components/Client/Layouts/ClientLayout"));
const Home = lazy(() => import("../pages/Client/Home/Home"));
const DetailProduct = lazy(() => import("../pages/Client/DetailProduct"));
const Payment = lazy(() => import("../pages/Client/Payment/Payment"));
const ShoppingCart = lazy(() => import("../pages/Client/ShoppingCart/ShoppingCart"));
const ProfileLayout = lazy(() => import("../components/Client/layouts/ProfileLayout"));
const ProfileInformation = lazy(() => import("../pages/Client/Profile/ProfileInformation"));
const ProfileLocation = lazy(() => import("../pages/Client/Profile/ProfileLocation"));
const ProfileChangePassWord = lazy(() => import("../pages/Client/Profile/ProfileChangePassWord"));
const ProfileCompanyInformation = lazy(() => import("../pages/Client/Profile/ProfileCompanyInformation"));
const ProfileProductloved = lazy(() => import("../pages/Client/Profile/ProfileProductloved"));
const ContactInformation = lazy(() => import("../pages/Client/ContactInformation"));
const ProfileOrderPendingConfirm = lazy(() => import("../pages/Client/Profile/ProfileOrderPendingConfirm"));
const ProfileOrderBeingShip = lazy(() => import("../pages/Client/Profile/ProfileOrderBeingShip"));
const ProfileOrderReceived = lazy(() => import("../pages/Client/Profile/ProfileOrderReceived"));
const ProfileOrderCanceled = lazy(() => import("../pages/Client/Profile/ProfileOrderCanceled"));

const ListOrder = lazy(() => import("../pages/Client/Profile/ListOrder"));
const SearchProduct = lazy(() => import("../pages/Client/Search/SearchProduct"));



// Admin components
const AdminLayout = lazy(() => import("../components/Admin/Layouts/AdminLayout"));
const SupplierManagement = lazy(() => import("../pages/Admin/SupplierManagement/SupplierManagement"));
const CategoryManagement = lazy(() => import("../pages/Admin/CategoryManagement/CategoryManagement"));
const ProductManagement = lazy(() => import("../pages/Admin/ProductManagement/ProductManagement"));
const ProductManagementAdd = lazy(() => import("../pages/Admin/ProductManagement/ProductManagementAdd"));
const BatchManagement = lazy(() => import("../pages/Admin/BatchManagement/BatchManagement"));
const CommentManagement = lazy(() => import("../pages/Admin/CommentManagement/CommentManagement"));
const AudienceStatistics = lazy(() => import("../pages/Admin/AudienceStatistics/AudienceStatistics"));
const OrderStatistics = lazy(() => import("../pages/Admin/OrderStatistics/OrderStatistics"));
const Contact = lazy(() => import("../pages/Admin/Contact/Contact"));
const WebsiteInfo = lazy(() => import("../pages/Admin/WebsiteInfo/WebsiteInfo"));
const BusinessStatistics = lazy(() => import("../pages/Admin/BusinessStatistics/BusinessStatistics"));

// Staff components
const StaffLayout = lazy(() => import("../components/Staff/Layouts/StafffLayout.jsx"));
const StaffContact = lazy(() => import("../pages/Staff/Contact/StaffContact")); 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
          <Route path="profile" element={
            <ProtectedRoute allowedRoles={[3]}>
              <ProfileLayout/>
            </ProtectedRoute>
          }>    
          <Route index element={<ProfileInformation />} />
          <Route path="locations" element={<ProfileLocation />} />
          <Route path="changepassword" element={<ProfileChangePassWord />} />
          <Route path="productloved" element={<ProfileProductloved />} />
          <Route path="productrated" element={<ProfileRatedProducts/>}/>
          <Route path="orderpendingconfirm" element={<ListOrder trangThai={0}/>}/>
          <Route path="orderbeingship" element={<ListOrder trangThai={1}/>}/>
          <Route path="orderreceived" element={<ListOrder trangThai={2}/>}/>
          <Route path="ordercanceled" element={<ListOrder trangThai={3}/>}/>
          <Route path="orderpendingconfirm/:id" element={<ProfileOrderPendingConfirm/>}/>
          <Route path="orderbeingship/:id" element={<ProfileOrderBeingShip/>}/>
          <Route path="orderreceived/:id" element={<ProfileOrderReceived/>}/>
          <Route path="ordercanceled/:id" element={<ProfileOrderCanceled/>}/>




        </Route>
        <Route path="news" element={<ListBlog/>}/>
        <Route path="contact" element={<ContactInformation/>}/>
        <Route path="about" element={<ProfileCompanyInformation/>}/>
        <Route path="product/:slug" element={<DetailProduct />} />
        <Route path="contact" element={<ContactInformation />} />
        <Route path="about" element={<ProfileCompanyInformation />} />
        <Route path="product" element={<DetailProduct />} />
        <Route path="payment" element={<Payment />} />
        <Route path="shoppingcart" element={<ShoppingCart />} />
        <Route path="searchproduct/:categoriess?/:texts?/:conditions?/:pages?" element={<SearchProduct />} />

      </Route>

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={[1]}> {/* Only Admin */}
            <AdminLayout />
          </ProtectedRoute>
        }>

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
        <Route path="contact" element={<Contact />} />
        <Route path="business-statistics" element={<BusinessStatistics />} />
      </Route>

      <Route path="/staff" element={
        <ProtectedRoute allowedRoles={[2]}> {/* Only Staff */}
          <StaffLayout />
        </ProtectedRoute>
      }>
        <Route index element={<StaffContact />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;