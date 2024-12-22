
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes/AppRoute';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
