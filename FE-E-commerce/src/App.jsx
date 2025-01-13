import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoute';
import UpdateTrigger from "./components/Client/UpdateTrigger/UpdateTrigger";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
      <BrowserRouter>
        <UpdateTrigger />
        <AppRoutes />
      </BrowserRouter>
  );
}

export default App;