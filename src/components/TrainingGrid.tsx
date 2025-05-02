import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
  ModuleRegistry,
} from "ag-grid-community";
import { getTrainings, TrainingAll } from "../service/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import DeleteTraining from "./DeleteTraining";

// Rekisteröidään kaikki AG-Gridin Community-ominaisuudet käyttöön
ModuleRegistry.registerModules([AllCommunityModule]);

// Määritellään propsin tyyppi
type Props = {
  reloadTrigger?: boolean;
  reloadGrid: () => void;
  onTrainingAdded?: () => void;
  onTrainingDeleted: () => void;
};

function TrainingGrid({ reloadTrigger, reloadGrid }: Props) {
  const [trainings, setTrainings] = useState<TrainingAll[]>([]);
  const [loading, setLoading] = useState(true);

  // Sarakemääritykset AG-Gridille
  const [columnDefs] = useState<ColDef<TrainingAll>[]>([
    {
      field: "date",
      headerName: "Date",
      sortable: true,
      filter: true,
      valueFormatter: (params: { value: string }) =>
        dayjs(params.value).format("DD.MM.YYYY HH:mm"),
    },
    {
      field: "duration",
      headerName: "Duration",
      sortable: true,
      filter: true,
    },
    {
      field: "activity",
      headerName: "Activity",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Customer",
      sortable: true,
      filter: true,
      // Haetaan asiakkaan nimi suoraan harjoitusobjektin customer-kentästä
      valueGetter: (params) =>
        params.data && params.data.customer
          ? `${params.data.customer.firstname} ${params.data.customer.lastname}`
          : "Ei tietoja",
    },
    {
      headerName: "Functionalities",
      cellRenderer: (params: ICellRendererParams<TrainingAll>) => (
        <DeleteTraining
          currentTraining={params.data as TrainingAll} // params.data on TrainingAll-tyyppinen
          onTrainingDeleted={reloadGrid} // sama logiikka kuin AddTrainingilla
        />
      ),
      width: 140,
      sortable: false,
      filter: false,
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
        toast.error("Could not fetch trainings");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, [reloadTrigger]);

  if (loading) {
    return <p>Ladataan harjoituksia...</p>;
  }

  return (
    <div
      style={{ minHeight: 500, margin: "0 auto", width: 640 }}
      className="ag-theme-alpine"
    >
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
