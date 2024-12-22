import { Outlet } from "react-router-dom"

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function MainLayout(){
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-grow-1 py-1">
          <div className="container">
            <Outlet />
          </div>
        </main>
        
        <Footer />
      </div>
    </>;
};

