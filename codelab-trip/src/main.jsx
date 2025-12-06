import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from './App.jsx';

import Trips from "./pages/Trips.jsx";
import TripDetails from "./pages/TripDetails.jsx";
import Guides from "./pages/Guides.jsx";
import NotFound from "./pages/NotFound.jsx";
import LogIn from "./pages/LoginF.jsx";    
import ProtectedRoute from "./ProtectedRoute.jsx";

// Finder <div id="root"></div> i index.html, som er stedet, hvor hele React-app’en skal placeres.
const root = document.getElementById("root");

//Opretter “root” for React og render hele React-app’en ind i den. Alt hvad der er inde i render() bliver vist i root.
ReactDOM.createRoot(root).render(
<BrowserRouter>                                                    {/*Det betyder, at når brugeren klikker på links, reloades siden ikke — kun komponenter ændres. */}
  <Routes>                                                         {/* “container”: all Route-elementer. styrer: hvilken komponent vises baseret på URL’en.*/}
    <Route path="/" element={<App />}>                             {/* parent-route. viser App-komponenten som overordnet layout. Alle nested routes (børn) bliver vist inde i <Outlet /> i App.jsx */}
      <Route index element={<Navigate to="/trips" />} />
      <Route path="login" element={<LogIn />} />
      <Route path="trips" element={<Trips />} />

      {/* USER-only route */}
      <Route element={<ProtectedRoute role="user" />}>              {/*Parent: tjekker først om brugeren er logget ind og har USER-rollen.*/}
        <Route path="trip/:id" element={<TripDetails />} />         {/*Hvis ja: vises nested route (TripDetails) inde i <Outlet /> i ProtectedRoute. */}
      </Route>

      {/* ADMIN-only route */}
      <Route element={<ProtectedRoute role="admin" />}>             
        <Route path="guides" element={<Guides />} />
      </Route>

      <Route path="*" element={<NotFound />} />                     {/*Hvis brugeren går til en URL, der ikke findes i app’en, vises NotFound-komponenten. */}
    </Route>
  </Routes>
</BrowserRouter>

);