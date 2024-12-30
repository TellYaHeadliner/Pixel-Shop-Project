import { Outlet } from "react-router-dom";

import HeaderClient from "../Header/Client/HeaderClient";
import Footer from "../Footer/Footer";

export default function MainLayout() {
  return (
    <div className="d-flex flex-column">
      <HeaderClient />

      <main className="flex-grow-1 ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
