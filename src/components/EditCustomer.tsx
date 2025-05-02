import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import { updateCustomer, CustomerGet } from "../service/api";

// Komponentin propsit: nykyinen asiakas ja callback kun muokkaus on tehty
interface Props {
  currentCustomer: CustomerGet;
  onCustomerEdited: () => void;
}

export default function EditCustomer({
  currentCustomer,
  onCustomerEdited,
}: Props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: currentCustomer.firstname,
    lastname: currentCustomer.lastname,
    streetaddress: currentCustomer.streetaddress,
    postcode: currentCustomer.postcode,
    city: currentCustomer.city,
    email: currentCustomer.email,
    phone: currentCustomer.phone,
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
      await updateCustomer({ ...currentCustomer, ...customer });
      toast.success("Asiakas muokattu");
      onCustomerEdited();
    } catch (error) {
      console.error(error);
      toast.error("Asiakkaan muokkaus epäonnistui");
    } finally {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" size="small" onClick={handleClickOpen}>
        Edit
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
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="firstname"
            label="First name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={customer.firstname}
          />
          <TextField
            required
            margin="dense"
            name="lastname"
            label="Last name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={customer.lastname}
          />
          <TextField
            required
            margin="dense"
            name="streetaddress"
            label="Street address"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={customer.streetaddress}
          />
          <TextField
            required
            margin="dense"
            name="postcode"
            label="Postal code"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={customer.postcode}
          />
          <TextField
            required
            margin="dense"
            name="city"
            label="City"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={customer.city}
          />
          <TextField
            required
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={customer.email}
          />
          <TextField
            required
            margin="dense"
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
