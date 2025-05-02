import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import { addTraining } from "../service/api";

// Props: asiakkaan linkki ja callback, joka kertoo parent-komponentille että uusi harjoitus lisättiin
type Props = {
  customerHref: string;
  onTrainingAdded: () => void;
};

export default function AddTraining({ customerHref, onTrainingAdded }: Props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    activity: "",
    duration: "",
    date: dayjs(),
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setTraining({ ...training, date: newDate });
    }
  };

  const handleSubmit = async () => {
    try {
      await addTraining({
        activity: training.activity,
        duration: parseInt(training.duration, 10),
        date: training.date.toISOString(),
        customer: customerHref,
      });
      toast.success("Workaout added successfully");
      onTrainingAdded();
    } catch (error) {
      console.error(error);
      toast.error("Workout addition failed");
    } finally {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" size="small" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleSubmit();
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Add training</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={training.date}
              onChange={handleDateChange}
              sx={{ marginTop: 2 }}
            />
          </LocalizationProvider>
          <TextField
            required
            margin="dense"
            name="activity"
            label="Activity"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={training.activity}
          />
          <TextField
            required
            margin="dense"
            name="duration"
            label="Duration (min)"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={training.duration}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
