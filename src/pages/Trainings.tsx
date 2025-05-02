import { Box, Typography } from "@mui/material";
import TrainingGrid from "../components/TrainingGrid";
import AddTraining from "../components/AddTraining";
import { useState } from "react";

const Trainings = () => {
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const reloadGrid = () => {
    setReloadTrigger(!reloadTrigger); // Vaihdetaan tilaa, jotta harjoituslista ladataan uudelleen
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Workouts
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <AddTraining
          onTrainingAdded={reloadGrid}
        />
      </Box>
      <TrainingGrid
        reloadTrigger={reloadTrigger}
        reloadGrid={reloadGrid}
        onTrainingAdded={reloadGrid}
        onTrainingDeleted={reloadGrid}
      />
    </Box>
  );
};

export default Trainings;
