import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const navigate = useNavigate(); // Navigointifunktio sivujen välillä siirtymiseen

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline /> {/* Nollaa selaimen oletustyylit MUI:n mukaisiksi */}
      <AppBar position="static">
        {/* Yläpalkki, jossa navigointipainikkeet */}
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          {/* Sovelluksen nimi toimii painikkeena kotisivulle */}
          <Button
            color="inherit"
            onClick={() => navigate("/")}
            sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Personal Trainer
          </Button>
          <Button color="inherit" onClick={() => navigate("/customers")}>
            Customers
          </Button>
          <Button color="inherit" onClick={() => navigate("/trainings")}>
            Workouts
          </Button>
          <Button color="inherit" onClick={() => navigate("/calendar")}>
            Calendar
          </Button>
        </Toolbar>
      </AppBar>
      {/* Pääsisältö näytetään täällä reitityksen perusteella */}
      <Box sx={{ p: 1 }}>
        <Outlet />
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
}

export default App;
