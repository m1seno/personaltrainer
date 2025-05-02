import { Box, Typography } from "@mui/material";
import CustomerGrid from "../components/CustomerGrid";
import AddCustomer from "../components/AddCustomer";
import { useState } from "react";

const Customers = () => {
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const reloadGrid = () => {
    setReloadTrigger(!reloadTrigger); // Vaihdetaan tilaa, jotta asiakaslista ladataan uudelleen
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Customers
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <AddCustomer onCustomerAdded={reloadGrid} />
      </Box>
      <CustomerGrid
        reloadTrigger={reloadTrigger}
        reloadGrid={reloadGrid}
        onCustomerAdded={reloadGrid}
        onCustomerEdited={reloadGrid}
        onCustomerDeleted={reloadGrid}
      />
    </Box>
  );
};

export default Customers;
