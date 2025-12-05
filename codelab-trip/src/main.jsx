import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from './App.jsx';

import Trips from "./pages/Trips.jsx";
import TripDetails from "./pages/TripDetails.jsx";
import Guides from "./pages/Guides.jsx";
import NotFound from "./pages/NotFound.jsx";
import LogIn from "./pages/LoginF.jsx";    
import ProtectedRoute from "./ProtectedRoute.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/trips" />} />
      <Route path="login" element={<LogIn />} />
      <Route path="trips" element={<Trips />} />

      {/* USER-only route */}
      <Route element={<ProtectedRoute role="USER" />}>
        <Route path="trip/:id" element={<TripDetails />} />
      </Route>

      {/* ADMIN-only route */}
      <Route element={<ProtectedRoute role="ADMIN" />}>
        <Route path="guides" element={<Guides />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
</BrowserRouter>

);