import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layouts/MainLayout";
import About from "../pages/Client/About";
import Home from "../pages/Client/Home";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;


