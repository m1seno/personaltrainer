import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Toolbar,
} from "@mui/material";
//import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();

  return (
    <Box sx={{flexGrow : 1}}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", gap: 2 }}>
        <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}
          >
            Personal Trainer
          </Button>
          <Button color="inherit" onClick={() => navigate('/trainings')}>
            Treenit
          </Button>
          <Button color="inherit" onClick={() => navigate('/customers')}>
            Asiakkaat
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3}}>
      <Outlet />
    </Container>
    </Box>
  );
}

export default App;
