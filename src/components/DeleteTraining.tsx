import { Button } from "@mui/material";
import React from "react";
import { TrainingAll, deleteTraining } from "../service/api";
import { toast } from "react-toastify";
import confirm from "../service/useConfirm";

interface Props {
  onTrainingDeleted: () => void; // Callback-funktio, joka kutsutaan kun harjoitus on poistettu
  currentTraining: TrainingAll;
}

export default function DeleteTraining({
  onTrainingDeleted,
  currentTraining,
}: Props) {
  const handleDelete = async () => {
    const confirmed = await confirm({
      confirmation: "Are you sure you want to delete this training?", // Näytetään vahvistusdialogi
    });
    if (!confirmed) {
      return; // Käyttäjä peruutti poiston
    }
    try {
      await deleteTraining(currentTraining);
      toast.success("Training deleted successfully");
      onTrainingDeleted();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete training");
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={handleDelete}
      >
        Delete
      </Button>
    </React.Fragment>
  );
}
