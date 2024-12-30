import { Routes, Route } from "react-router-dom";

import ClientLayout from "../components/Client/layouts/ClientLayout";
import Home from "../pages/Client/Home";
import AdminLayout from "../components/Admin/layouts/AdminLayout";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />} />

    </Routes>
  );
};

export default AppRoutes;


