import { Button } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";
import { CustomerAll } from "../service/api";
import { toast } from "react-toastify";

/// Tyyppimääritys, joka sisältää asiakaslistan sarakkeet
type Props = {
  gridRef: RefObject<AgGridReact<CustomerAll> | null>;
};

/// Komponentti, joka vie asiakaslistan CSV-tiedostona
export default function ExportCsv({ gridRef }: Props) {
  const handleExport = () => {
    try {
      if (gridRef.current) {
        gridRef.current.api.exportDataAsCsv({
          fileName: "customers.csv",
          columnKeys: [
            "firstname",
            "lastname",
            "streetaddress",
            "postcode",
            "city",
            "email",
            "phone",
          ],
        });
      }
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Error exporting CSV. Please try again.");
    }
  };

  return (
    <Button variant="outlined" color="success" onClick={handleExport}>
      Export to CSV
    </Button>
  );
}
