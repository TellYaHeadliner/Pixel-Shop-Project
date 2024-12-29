import { Outlet } from "react-router-dom"

import HeaderClient from "../Header/HeaderClient";
import Footer from "../Footer/Footer";

export default function MainLayout(){
   return (
     <div className="d-flex flex-column min-vh-100">
       <HeaderClient />

       <main className="flex-grow-1 py-1">
         <div className="container">
           <Outlet />
         </div>
       </main>

       <Footer />
     </div>
   );
};

