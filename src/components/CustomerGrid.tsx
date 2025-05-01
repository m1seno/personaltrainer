import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ColDef, ICellRendererParams, ModuleRegistry } from "ag-grid-community";
import { getCustomers, CustomerGet } from "../service/api";
import { toast } from "react-toastify";
import EditCustomer from "./EditCustomer";

// Rekisteröidään kaikki AG-Gridin Community-ominaisuudet käyttöön
ModuleRegistry.registerModules([AllCommunityModule]);

// Määritellään propsin tyyppi
type Props = {
  reloadTrigger?: boolean;
  onCustomerAdded: () => void;
  onCustomerEdited: () => void;
};

function CustomerGrid({reloadTrigger, onCustomerAdded}: Props) {
  const [customers, setCustomers] = useState<CustomerGet[]>([]);
  const [loading, setLoading] = useState(true);

  // Sarakemääritykset AG-Gridille
  const [columnDefs] = useState<ColDef<CustomerGet>[]>([
    { field: "firstname", headerName: "First name", sortable: true, filter: true },
    { field: "lastname", headerName: "Last name", sortable: true, filter: true },
    { field: "streetaddress", headerName: "Address", sortable: true, filter: true},
    { field: "postcode", headerName: "Postal code", sortable: true, filter: true },
    { field: "city", headerName: "City", sortable: true, filter: true },
    { field: "email", headerName: "Email", sortable: true, filter: true },
    { field: "phone", headerName: "Phone", sortable: true, filter: true },
    {
      headerName: "Functionalities",
      cellRenderer: (params: ICellRendererParams<CustomerGet>) => (
        <EditCustomer
          currentCustomer={params.data as CustomerGet} // params.data on CustomerGet-tyyppinen
          onCustomerEdited={onCustomerAdded} // sama logiikka kuin AddCustomerilla
        />
      ),
      width: 140,
      sortable: false,
      filter: false,
    }
  ]);

  useEffect(() => {
    // Haetaan asiakkaat komponentin latautuessa
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
  }, [reloadTrigger]); // reloadTrigger riippuvuus, jotta asiakaslista ladataan uudelleen kun asiakas lisätään

  if (loading) {
    return <p>Ladataan asiakkaita...</p>;
  }

  return (
    <div style={{ minHeight: 500, margin: '0 auto', width: 1050 }} className="ag-theme-alpine">
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
