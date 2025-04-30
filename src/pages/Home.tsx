import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";

function Home() {
  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={5}>
        <Typography variant="h3" gutterBottom>
          Terveruloa Personal Traineriin
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Tämä selainpohjainen käyttöliittymä tarjoaa helpon ja selkeän tavan
          hallita yrityksen asiakkaita ja heidän harjoitustietojaan.
          Sovelluksella voit tarkastella asiakas- ja harjoituslistauksia, lisätä
          uusia tietoja, muokata olemassa olevia sekä viedä asiakasdatan
          CSV-tiedostona. Kalenterinäkymä ja tilastot tarjoavat kokonaiskuvan
          harjoituksista ja niiden jakaumasta.
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
