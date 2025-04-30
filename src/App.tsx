import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate(); // Navigointifunktio sivujen välillä siirtymiseen

  return (
    <Box sx={{flexGrow : 1}}>
      <CssBaseline /> {/* Nollaa selaimen oletustyylit MUI:n mukaisiksi */}
      <AppBar position="static">
        {/* Yläpalkki, jossa navigointipainikkeet */}
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          {/* Sovelluksen nimi toimii painikkeena kotisivulle */}
        <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}
          >
            Personal Trainer
          </Button>
          <Button color="inherit" onClick={() => navigate('/customers')}>
            Asiakkaat
          </Button>
          <Button color="inherit" onClick={() => navigate('/trainings')}>
            Treenit
          </Button>
        </Toolbar>
      </AppBar>
      {/* Pääsisältö näytetään täällä reitityksen perusteella */}
      <Container maxWidth = "xl">
      <Outlet />
    </Container>
    </Box>
  );
}

export default App;
