import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Customers from "./pages/Customers.tsx";
import Trainings from "./pages/Trainings.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Error from "./pages/Error.tsx";

// Määritellään sovelluksen reititys
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,               // Sovelluksen perusrakenne (AppBar + Outlet)
    errorElement: <Error />,        // Näytetään virhesivu, jos reititys epäonnistuu
    children: [
      { index: true, element: <Home /> },             // / → Etusivu
      { path: "customers", element: <Customers /> },  // /customers → Asiakassivu
      { path: "trainings", element: <Trainings /> },  // /trainings → Treenisivu
    ],
  },
]);

// Alustetaan React-sovellus juurielementtiin
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
