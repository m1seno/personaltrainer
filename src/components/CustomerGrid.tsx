import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { getCustomers, Customer } from "../service/api";
import { toast } from "react-toastify";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function CustomerGrid() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const [columnDefs] = useState<ColDef<Customer>[]>([
    { field: "firstname", headerName: "Etunimi", sortable: true, filter: true },
    { field: "lastname", headerName: "Sukunimi", sortable: true, filter: true },
    { field: "streetaddress", headerName: "Katuosoite", sortable: true, filter: true},
    { field: "postcode", headerName: "Postinumero", sortable: true, filter: true },
    { field: "city", headerName: "Kaupunki", sortable: true, filter: true },
    { field: "email", headerName: "Sähköposti", sortable: true, filter: true },
    { field: "phone", headerName: "Puhelin", sortable: true, filter: true },
  ]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error(error);
        toast.error("Asiakastietojen haku epäonnistui");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <p>Ladataan asiakkaita...</p>;
  }

  return (
    <div style={{ minHeight: 500, width: 1000 }} className="ag-theme-alpine">
      <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, minWidth: 100 }}
        paginationPageSize={10}
        pagination={true}
        domLayout="autoHeight"
      />
    </div>
  );
}

export default CustomerGrid;
