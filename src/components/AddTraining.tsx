import React, { useState, ChangeEvent, useEffect } from "react";
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
import { addTraining, CustomerAll, getCustomers } from "../service/api";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// Props: asiakkaan linkki ja callback, joka kertoo parent-komponentille että uusi harjoitus lisättiin
type Props = {
  onTrainingAdded: () => void;
};

export default function AddTraining({ onTrainingAdded }: Props) {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<CustomerAll[]>([]); // Asiakkaat API:sta
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAll | null>(null);// Valittu asiakas (käytetään asiakaslinkkiä lähetyksessä)
  const [training, setTraining] = useState({
    activity: "",
    duration: "",
    date: dayjs(),
  });

  // Haetaan asiakkaat komponentin latauksessa
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch customers");
      }
    };
    fetchCustomers();
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  // Päivämäärän käsittely DatePickerissä
  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setTraining({ ...training, date: newDate });
    }
  };

  const handleSubmit = async () => {
    try {
      if (!selectedCustomer) {
        toast.error("Please select a customer");
        return;
      }
      await addTraining({
        activity: training.activity,
        duration: parseInt(training.duration, 10),
        date: training.date.toISOString(),
        customer: selectedCustomer._links.self.href,
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
      <Button variant="contained" color="success" onClick={handleClickOpen}>
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
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="customer-select-label">Customer</InputLabel>
            <Select
              labelId="customer-select-label"
              // Näytettävä arvo Select-komponentissa: valitun asiakkaan linkki (tai tyhjä jos ei ole valittu)
              value={selectedCustomer ? selectedCustomer._links.self.href : ""}
              label="Customer"
              onChange={(e) => {
                // Haetaan asiakasobjekti sen linkin perusteella, joka valittiin alasvetovalikosta
                const found = customers.find(
                  (c) => c._links.self.href === e.target.value
                );
                if (found) setSelectedCustomer(found); // Päivitetään tilaan koko asiakasobjekti
              }}
            >
                {/* Rakennetaan alasvetovalikon vaihtoehdot */}
              {customers.map((c) => (
                <MenuItem 
                    key={c._links.self.href}  // Käytetään asiakkaan linkkiä avaimena
                    value={c._links.self.href} // Valitaan asiakkaan linkki alasvetovalikossa
                >
                  {c.firstname} {c.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
