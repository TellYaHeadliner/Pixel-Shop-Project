import { Routes, Route } from "react-router-dom";

// import MainLayout from "../components/layouts/MainLayout";
// import Contact from "../pages/LienHe";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Header from "../components/Header/Header";

const AppRoutes = () => (
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

    <Header />

    {/* Add more routes here */}
  </div>
);

export default AppRoutes;


