import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Client/Home";
import AdminLayout from "../components/layouts/AdminLayout";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />} />

    </Routes>
  );
};

export default AppRoutes;


