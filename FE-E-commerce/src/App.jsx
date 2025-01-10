import { BrowserRouter } from 'react-router-dom'; // Use 'react-router-dom' instead of 'react-router'
import AppRoutes from './routes/AppRoute';
import { UserProvider } from './routes/UserContext'; // Import UserProvider
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateTrigger from "./components/Client/UpdateTrigger/UpdateTrigger";

import "./App.css";

function App() {
  return (
    <UserProvider> {/* Wrap the AppRoutes with UserProvider */}
      <BrowserRouter>
        <UpdateTrigger/>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;