import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Customers from "./pages/Customers.tsx";
import Trainings from "./pages/Trainings.tsx";
import Home from "./pages/Home.tsx";
import Error from "./pages/Error.tsx";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Tuodaan kalenterin tyylit
import Calendar from "./pages/Calendar.tsx";
import { HashRouter, Route, Routes } from "react-router-dom";

// Alustetaan React-sovellus juurielementtiin
createRoot(document.getElementById("root")!).render(
  <StrictMode>
<HashRouter>
      <Routes>
        <Route path="/" element={<App />}>      {/* Sovelluksen perusrakenne (AppBar + Outlet) */}
          <Route index element={<Home />} />    {/* / → Etusivu */}
          <Route path="customers" element={<Customers />} />  {/* /customers → Asiakassivu */}
          <Route path="trainings" element={<Trainings />} />  {/* /trainings → Treenisivu */}
          <Route path="calendar" element={<Calendar />} />    {/* /calendar → Kalenterisivu */}
          <Route path="*" element={<Error />} />       {/* Näytetään virhesivu, jos reititys epäonnistuu */}
        </Route>
      </Routes>
    </HashRouter>  </StrictMode>
);
