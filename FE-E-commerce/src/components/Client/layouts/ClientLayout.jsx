import { Outlet } from "react-router-dom";

import HeaderClient from "../Header/ClientHeader";
import FooterClient from "../Footer/FooterClient";
export default function ClientLayout() {
  return (
    <div className="d-flex flex-column">
      <HeaderClient />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <footer className="mt-4">
        <FooterClient />
      </footer>
    </div>
  );
}
