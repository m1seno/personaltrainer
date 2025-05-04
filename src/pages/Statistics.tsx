import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { getTrainings } from "../service/api";
import { groupBy, sumBy } from "lodash";
import { toast } from "react-toastify";
import { Typography, Box } from "@mui/material";

export default function Statistics() {
    // Tilamuuttuja, joka sisältää treenitiedot.
  const [data, setData] = useState<{ name: string; duration: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trainings = await getTrainings();

        // Ryhmitellään treenit aktiviteetin mukaan
        const grouped = groupBy(trainings, "activity");

        // Lasketaan kunkin aktiviteetin kokonaiskesto
        const chartData = Object.entries(grouped).map(
          ([activity, sessions]) => ({
            name: activity,
            duration: sumBy(sessions, "duration"),
          })
        );

        setData(chartData);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load statistics");
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Total Duration per Activity
      </Typography>
      {/* Tekee kaaviosta skaalautuvan ja responsiivisen */}
      <ResponsiveContainer width="100%" height={400}>
        {/* Varsinainen pylväsdiagrammi */}
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" /> {/* Taustaverkko */}
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "Duration (min)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip /> {/* Näyttää popup-kuvakkeen kun käyttäjä vie hiiren palkin päälle. */}
          <Legend /> {/* Näyttää legendan, joka kertoo mitä värit tarkoittavat. Ei ehkä tarpeellinen tässä tapauksessa, mutta yleisesti ottaen kiva juttu */}
          <Bar dataKey="duration" fill="mediumpurple" /> {/* Luo yksittäiset palkit kaavioon */}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
