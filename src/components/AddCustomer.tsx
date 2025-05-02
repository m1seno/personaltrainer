import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import { addCustomer } from "../service/api";

// Määritellään propsin tyyppi
type Props = {
  onCustomerAdded: () => void;
};

export default function AddCustomer({ onCustomerAdded }: Props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addCustomer(customer);
      toast.success("Customer added successfully");
      onCustomerAdded(); // Ilmoitetaan parent-komponentille, että asiakas on lisätty
    } catch (error) {
      console.error(error);
      toast.error("Customer addition failed");
    } finally {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Add customer
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
        <DialogTitle>Add customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstname"
            name="firstname"
            label="First name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={customer.firstname}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="lastname"
            name="lastname"
            label="Last name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={customer.lastname}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="streetaddress"
            name="streetaddress"
            label="Street address"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={customer.streetaddress}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="postcode"
            name="postcode"
            label="Postal code"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={customer.postcode}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="city"
            name="city"
            label="City"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={customer.city}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={customer.email}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={customer.phone}
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
