import {Box, Typography} from '@mui/material';
import CustomerGrid from '../components/CustomerGrid';

const Customers = () => {
  return (
    <Box sx={{p: 2}}>
      <Typography variant="h4" align="center" gutterBottom>
        Asiakaslista
      </Typography>
      <CustomerGrid />
    </Box>
  );
}

export default Customers;