import { Outlet } from "react-router-dom";

import HeaderClient from "../Header/Client/HeaderClient";
import Footer from "../Footer/Footer";

export default function MainLayout() {
  return (
    <div className="d-flex flex-column vh-100">
      <HeaderClient />

      <main className="d-flex flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
