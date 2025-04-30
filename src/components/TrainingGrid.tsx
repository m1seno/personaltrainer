import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { getTrainings, Training } from "../service/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

// Rekisteröidään kaikki AG-Gridin Community-ominaisuudet käyttöön
ModuleRegistry.registerModules([AllCommunityModule]);

function TrainingGrid() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  // Sarakemääritykset AG-Gridille
  const [columnDefs] = useState<ColDef<Training>[]>([
    {
      field: "date",
      headerName: "Päivämäärä",
      sortable: true,
      filter: true,
      valueFormatter: (params: { value: string }) =>
        dayjs(params.value).format("DD.MM.YYYY HH:mm"),
    },
    {
      field: "duration",
      headerName: "Kesto",
      sortable: true,
      filter: true,
    },
    {
      field: "activity",
      headerName: "Aktiviteetti",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Asiakas",
      sortable: true,
      filter: true,
      // Haetaan asiakkaan nimi suoraan harjoitusobjektin customer-kentästä
      valueGetter: (params) =>
        params.data && params.data.customer
          ? `${params.data.customer.firstname} ${params.data.customer.lastname}`
          : "Ei tietoja",
    },
  ]);

  useEffect(() => {
    // Haetaan harjoitukset komponentin alustuksessa
    const fetchTrainings = async () => {
      try {
        const data = await getTrainings();
        setTrainings(data);
      } catch (error) {
        console.error(error);
        toast.error("Asiakastietojen haku epäonnistui");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  if (loading) {
    return <p>Ladataan harjoituksia...</p>;
  }

  return (
    <div style={{ minHeight: 500, margin: '0 auto', width: 600 }} className="ag-theme-alpine">
      <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, minWidth: 100 }}
        paginationPageSize={10}
        pagination={true}
        domLayout="autoHeight"
      />
    </div>
  );
}

export default TrainingGrid;
