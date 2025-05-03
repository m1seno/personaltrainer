import { Box, Typography } from "@mui/material";
import CustomerGrid from "../components/CustomerGrid";
import AddCustomer from "../components/AddCustomer";
import { useRef, useState } from "react";
import ExportCsv from "../components/ExportCsv";
import { AgGridReact } from "ag-grid-react";
import { CustomerAll } from "../service/api";

const Customers = () => {
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const gridRef = useRef<AgGridReact<CustomerAll> | null>(null); // Luodaan ref asiakaslistalle

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
        <ExportCsv gridRef={gridRef} />
      </Box>
      <CustomerGrid
        reloadTrigger={reloadTrigger}
        reloadGrid={reloadGrid}
        onCustomerAdded={reloadGrid}
        onCustomerEdited={reloadGrid}
        onCustomerDeleted={reloadGrid}
        gridRef={gridRef}
      />
    </Box>
  );
};

export default Customers;
