import { Box, Typography } from "@mui/material";
import CustomerGrid from "../components/CustomerGrid";
import AddCustomer from "./AddCustomer";
import { useState } from "react";

const Customers = () => {
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const handleCustomerAdded = () => {
    setReloadTrigger(!reloadTrigger); // Vaihdetaan tilaa, jotta asiakaslista ladataan uudelleen
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Customers
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <AddCustomer onCustomerAdded={handleCustomerAdded} />
      </Box>
      <CustomerGrid
        reloadTrigger={reloadTrigger}
        onCustomerAdded={handleCustomerAdded}
        onCustomerEdited={handleCustomerAdded}
      />
    </Box>
  );
};

export default Customers;
